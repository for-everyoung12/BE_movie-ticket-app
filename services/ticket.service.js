const Ticket = require('../models/ticket.model');
const Seat = require('../models/seat.model');
const Movie = require('../models/movie.model');
const Showtime = require('../models/showtime.model');

class TicketService {
  static async createTicket(ticketData) {
    try {
      const seats = await Seat.find({ seat_number: { $in: ticketData.seat_numbers } });

      if (seats.length !== ticketData.seat_numbers.length) {
        throw new Error('Some seats are invalid or already booked');
      }

      const ticket = new Ticket(ticketData);
      await ticket.save();

      const seatNumbers = ticketData.seat_numbers;
      const currentTime = new Date();
      const heldUntil = new Date(currentTime.getTime() + 30 * 1000);

      await Seat.updateMany(
        { seat_number: { $in: seatNumbers } },
        { $set: { status: 'held', held_until: heldUntil } }
      );

      const showtime = await Showtime.findOne({ movie_id: ticketData.movie_id, showtime: ticketData.showtime });
      if (showtime) {
        showtime.available_seats -= ticketData.seat_numbers.length;
        await showtime.save();
      }

      return ticket;
    } catch (error) {
      throw new Error('Error creating ticket: ' + error.message);
    }
  }

  static async getTicketsByUser(userId) {
    try {
      return await Ticket.find({ user_id: userId }).populate('movie_id').populate('seat_numbers');
    } catch (error) {
      throw new Error('Error retrieving tickets');
    }
  }

  static async updateTicketStatus(ticketId, status) {
    try {
      const ticket = await Ticket.findByIdAndUpdate(ticketId, { status }, { new: true });
      if (!ticket) {
        throw new Error('Ticket not found');
      }
      return ticket;
    } catch (error) {
      throw new Error('Error updating ticket status');
    }
  }

  static async deleteTicket(ticketId) {
    try {
      const ticket = await Ticket.findByIdAndDelete(ticketId);
      if (!ticket) {
        throw new Error('Ticket not found');
      }

      const seat = await Seat.findOne({ seat_number: ticket.seat_numbers[0] });
      if (seat) {
        seat.status = 'available';
        await seat.save();
      }

      return { message: 'Ticket deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting ticket');
    }
  }
}

module.exports = TicketService;
