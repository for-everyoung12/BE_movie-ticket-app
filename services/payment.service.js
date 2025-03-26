const mongoose = require("mongoose");
const Payment = require("../models/payment.model");
const Seat = require("../models/seat.model");
const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");
const IPaymentService = require("../interfaces/IPaymentService");
const paypalClient = require("../config/paypal.config");
const paypal = require("@paypal/checkout-server-sdk");
const EmailService = require("../services/email.service");

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
        let approveLink = null;

        if (payment_method.toLowerCase() === "paypal") {
            // Tạo đơn hàng PayPal
            const request = new paypal.orders.OrdersCreateRequest();
            request.requestBody({
                intent: "CAPTURE",
                purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: total_amount.toFixed(2), 
                       
                    },
                }],
                application_context: {
                  return_url: "https://example.com/redirect-success", 
                  cancel_url: "https://example.com/redirect-cancel"
                }
            });

            const response = await paypalClient.execute(request);
            transaction_id = response.result.id;
            approveLink = response.result.links.find(link => link.rel === "approve")?.href;
        }

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
            approve_link: approveLink, 
            status: "Payment Created",
        };

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
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
  
      if (!response.result || response.result.status !== "COMPLETED") {
        throw new Error("Payment failed or not completed.");
      }
  
      // Tìm và cập nhật trạng thái thanh toán
      const payment = await Payment.findOneAndUpdate(
        { transaction_id: orderId },
        { payment_status: "Completed" },
        { new: true, session }
      );
  
      if (!payment) {
        throw new Error("Payment record not found.");
      }
  
      const tickets = await Ticket.find({ _id: { $in: payment.ticket_ids } })
      .populate("movie_id") 
      .populate("showtime_id"); 

      console.log('Tickets:', tickets); 
  
      const allSeatNumbers = tickets.flatMap(ticket => ticket.seat_numbers);
      const allShowtimeIds = tickets.map(ticket => ticket.showtime_id);
  
      console.log("Seats to be updated:", allSeatNumbers);
      console.log("Showtime IDs:", allShowtimeIds);
  
      if (allSeatNumbers.length === 0) {
        throw new Error("No seat numbers found for tickets.");
      }
  
      await Ticket.updateMany(
        { _id: { $in: payment.ticket_ids } },
        { $set: { 
          payment_status: "paid", 
          status: "booked",
          held_until: null
        }},
        { session }
      );
  
      await User.findByIdAndUpdate(
        payment.user_id,
        { $push: { booked_tickets: { $each: payment.ticket_ids } } },
        { session }
      );
  
      const seatUpdateResult = await Seat.updateMany(
        { 
          seat_number: { $in: allSeatNumbers }, 
          showtime_id: { $in: allShowtimeIds }, 
          status: "held"  
        },
        { $set: { status: "booked", held_until: null } },
        { session }
      );
  
      console.log("Seat Update Result:", seatUpdateResult);
  
      await session.commitTransaction();
      session.endSession();
  
      const user = await User.findById(payment.user_id);
      if (user && user.email) {
        const ticketDetails = {
          movie_name: tickets[0].movie_id.title, 
          showtime: tickets[0].showtime_id?.showtime
          ? new Date(tickets[0].showtime_id.showtime).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
          : "Không xác định",
          seat_numbers: allSeatNumbers,
          price: payment.total_amount
        };

        await EmailService.sendBookingConfirmation(user.email, ticketDetails);
        console.log("✅ Email đã gửi thành công!");
      } else {
        console.log("⚠️ Không tìm thấy email của người dùng, không thể gửi email.");
      }

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
