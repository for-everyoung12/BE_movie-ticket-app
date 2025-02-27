const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showtime: { type: Date, required: true },
  seat_number: { type: String, required: true },
  status: { type: String, enum: ['booked', 'cancelled', 'pending', 'refunded'], default: 'booked' },
  price: { type: Number, required: true },
  showtime_price: { type: Number, required: true }  
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
