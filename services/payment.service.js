const Payment = require("../models/payment.model");
const Seat = require("../models/seat.model");
const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");

class PaymentService {
  static async createPayment(paymentData) {
    const {
      user_id,
      ticket_ids,
      total_amount,
      payment_method,
      transaction_id,
    } = paymentData;

    try {
      const tickets = await Ticket.find({ _id: { $in: ticket_ids } });
      if (tickets.length !== ticket_ids.length) {
        throw new Error("Some tickets are invalid");
      }

      const payment = new Payment({
        user_id,
        ticket_ids,
        total_amount,
        payment_method,
        payment_status: "Completed",
        transaction_id,
      });
      await payment.save();

      await Ticket.updateMany(
        { _id: { $in: ticket_ids } },
        { $set: { payment_status: "paid", status: "booked" } }
      );

      const user = await User.findById(user_id);
      user.booked_tickets.push(...ticket_ids);
      await user.save();

      for (const ticket of tickets) {
        const seat = await Seat.findOne({ seat_number: ticket.seat_numbers });
        if (seat && seat.status === "held") {
          seat.status = "booked";
          seat.held_until = null;
          await seat.save();
        }
      }

      return payment;
    } catch (error) {
      throw new Error("Error processing payment: " + error.message);
    }
  }

  static async getPaymentById(paymentId) {
    try {
      return await Payment.findById(paymentId).populate("ticket_ids");
    } catch (error) {
      throw new Error("Error retrieving payment");
    }
  }
}

module.exports = PaymentService;
