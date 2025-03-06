const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  seat_number: { type: String, required: true },
  status: { type: String, enum: ['available', 'booked', 'held'], default: 'available' },
  held_until: { type: Date, default: null },
  showtime_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true } 
});

seatSchema.index({ held_until: 1 }, { expireAfterSeconds: 300 });  

const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;
