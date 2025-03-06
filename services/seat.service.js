const Seat = require('../models/seat.model');

class SeatService {
  static async getSeatsByRoom(roomId) {
    try {
      return await Seat.find({ room_id: roomId });
    } catch (error) {
      throw new Error('Error retrieving seats');
    }
  }

  static async createSeat(showtime_id, room_id, totalSeats, status) {
    if (!totalSeats || totalSeats <= 0) {
      throw new Error('totalSeats is required and must be a positive number');
    }

    try {
      const rows = 10; // Số hàng (mỗi hàng có 10 ghế)
      const seatsPerRow = totalSeats / rows; // Tính số ghế mỗi hàng

      if (seatsPerRow % 1 !== 0) {
        throw new Error('Total seats must be divisible by the number of rows');
      }

      for (let row = 1; row <= rows; row++) {
        for (let seat = 1; seat <= seatsPerRow; seat++) {
          const seatNumber = `${String.fromCharCode(64 + row)}${seat}`; // Tạo tên ghế như A1, A2, B1, B2...

          const existingSeat = await Seat.findOne({ seat_number: seatNumber, room_id, showtime_id });
          if (existingSeat) {
            throw new Error(`Seat ${seatNumber} already exists in this room for this showtime`);
          }

          const newSeat = new Seat({
            room_id,
            showtime_id,
            seat_number: seatNumber,
            status: 'available',  // Trạng thái ban đầu là 'available'
          });

          await newSeat.save();
        }
      }

      return { message: `${totalSeats} seats created successfully` };
    } catch (error) {
      throw new Error('Error creating seats: ' + error.message);
    }
  }



  static async updateSeatStatus(seatData) {
    try {
      const seat = await Seat.findOne({ seat_number: seatData.seat_number, room_id: seatData.room_id });

      if (!seat) {
        throw new Error('Seat not found');
      }

      seat.status = seatData.status;
      if (seatData.status === 'held') {
        seat.held_until = new Date(Date.now() + 5 * 60 * 1000);
      }
      await seat.save();
      return seat;
    } catch (error) {
      throw new Error('Error updating seat status');
    }
  }
}

module.exports = SeatService;