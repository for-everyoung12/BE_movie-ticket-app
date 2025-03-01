const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showtime: { type: Date, required: true },
  seat_number: { type: String, required: true },
  status: { type: String, enum: ['booked', 'cancelled', 'pending', 'refunded'], default: 'pending' }, // Trạng thái là pending khi chưa thanh toán
  price: { type: Number, required: true },
  showtime_price: { type: Number, required: true },
  payment_status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' }, // Trạng thái thanh toán
  held_until: { type: Date, default: Date.now, expires: '10m' }  // Ghế sẽ tự động hết hạn sau 10 phút
});

// Thêm indexes để tối ưu truy vấn
ticketSchema.index({ user_id: 1 });  // Index cho user_id
ticketSchema.index({ movie_id: 1, showtime: 1 });  // Index cho movie_id và showtime

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
