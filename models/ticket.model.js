const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showtime: { type: Date, required: true },
  seat_numbers: [{ type: String, required: true }], 
  status: { type: String, enum: ['booked', 'cancelled', 'pending', 'refunded'], default: 'pending' },
  price: { type: Number, required: true },
  showtime_price: { type: Number, required: true },
  payment_status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  held_until: { type: Date, default: Date.now, expires: '30s' } 
});

ticketSchema.index({ user_id: 1 }); 
ticketSchema.index({ movie_id: 1, showtime: 1 });

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
