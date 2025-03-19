const mongoose = require("mongoose");
const Payment = require("../models/payment.model");
const Seat = require("../models/seat.model");
const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");
const IPaymentService = require("../interfaces/IPaymentService");
const paypalClient = require("../config/paypal.config");
const paypal = require("@paypal/checkout-server-sdk");

class PaymentService extends IPaymentService {
  // Tạo đơn hàng PayPal
  async createPayment(paymentData) {
    const { user_id, ticket_ids, total_amount, payment_method } = paymentData;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Kiểm tra vé hợp lệ
      const tickets = await Ticket.find({ _id: { $in: ticket_ids } }).session(session);
      if (tickets.length !== ticket_ids.length) {
        throw new Error("Some tickets are invalid");
      }

      let transaction_id = null;
      let payment_status = "Pending";

      if (payment_method === "paypal") {
        // Tạo đơn hàng PayPal
        const request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: total_amount.toString(),
              },
            },
          ],
        });

        const response = await paypalClient.execute(request);
        transaction_id = response.result.id;
      }

      // Lưu payment vào DB (chưa hoàn tất)
      const payment = new Payment({
        user_id,
        ticket_ids,
        total_amount,
        payment_method,
        payment_status,
        transaction_id,
      });
      await payment.save({ session });

      await session.commitTransaction();
      session.endSession();

      return {
        payment_id: payment._id,
        transaction_id,
        status: "Payment Created",
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("Error processing payment: " + error.message);
    }
  }

  // Xác nhận thanh toán PayPal
  async capturePayment(orderId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});
      const response = await paypalClient.execute(request);

      if (response.result.status !== "COMPLETED") {
        throw new Error("Payment was not completed.");
      }

      // Cập nhật trạng thái thanh toán
      const payment = await Payment.findOneAndUpdate(
        { transaction_id: orderId },
        { payment_status: "Completed" },
        { new: true, session }
      );

      if (!payment) {
        throw new Error("Payment record not found.");
      }

      // Cập nhật trạng thái vé
      await Ticket.updateMany(
        { _id: { $in: payment.ticket_ids } },
        { $set: { payment_status: "paid", status: "booked" } },
        { session }
      );

      // Cập nhật danh sách vé của user
      await User.findByIdAndUpdate(
        payment.user_id,
        { $push: { booked_tickets: { $each: payment.ticket_ids } } },
        { session }
      );

      // Cập nhật trạng thái ghế
      await Seat.updateMany(
        { seat_number: { $in: payment.ticket_ids.map((t) => t.seat_numbers) }, status: "held" },
        { $set: { status: "booked", held_until: null } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return { status: "Payment Captured", payment };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("Error capturing payment: " + error.message);
    }
  }

  // Lấy thông tin thanh toán
  async getPaymentById(paymentId) {
    try {
      return await Payment.findById(paymentId).populate("ticket_ids");
    } catch (error) {
      throw new Error("Error retrieving payment");
    }
  }
}

module.exports = PaymentService;
