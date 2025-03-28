const Ticket = require('../models/ticket.model');
const Seat = require('../models/seat.model');
const Movie = require('../models/movie.model');
const Showtime = require('../models/showtime.model');
const Room = require('../models/room.model')
const ITicketService = require('../interfaces/ITicketService');
const User = require('../models/user.model');
class TicketService extends ITicketService {
  async createTicket(ticketData) {
    try {
      console.log("Received ticketData:", ticketData);
  
      const showtime = await Showtime.findById(ticketData.showtime_id);
      if (!showtime) {
        throw new Error('Showtime not found');
      }
  
      const seats = await Seat.find({
        seat_number: { $in: ticketData.seat_numbers },
        showtime_id: ticketData.showtime_id,
        room_id: showtime.room_id,
        status: 'available'
      });
  
      if (seats.length !== ticketData.seat_numbers.length) {
        throw new Error('Some seats are invalid or already booked');
      }
  
      const ticket = new Ticket(ticketData);
      await ticket.save();
  
      // 🔥 FIX QUAN TRỌNG NHẤT: thêm vé vào user
      await User.findByIdAndUpdate(ticketData.user_id, {
        $push: { booked_tickets: ticket._id }
      });
  
      const heldUntil = new Date(Date.now() + 5 * 60 * 1000); // Giữ ghế 5 phút
  
      await Seat.updateMany(
        {
          seat_number: { $in: ticketData.seat_numbers },
          showtime_id: ticketData.showtime_id
        },
        {
          $set: { status: 'held', held_until: heldUntil }
        }
      );
  
      const availableSeats = await Seat.countDocuments({
        showtime_id: ticketData.showtime_id,
        status: 'available'
      });
  
      await Showtime.findByIdAndUpdate(ticketData.showtime_id, {
        available_seats: availableSeats
      });
  
      return ticket;
  
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw new Error('Error creating ticket: ' + error.message);
    }
  }
  


async getTicketsByUser(userId) {
  try {
    const user = await User.findById(userId).populate({
      path: 'booked_tickets',
      populate: [
        { path: 'movie_id', select: 'title poster_url' },
        { path: 'showtime_id', select: 'showtime' },
        { path: 'room_id', select: 'hall_number' }
      ]
    });

    if (!user || user.booked_tickets.length === 0) {
      return [];
    }

    return user.booked_tickets;
  } catch (error) {
    throw new Error('Error retrieving tickets');
  }
}


  async updateTicketStatus(ticketId, status) {
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

  async deleteTicket(ticketId) {
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
