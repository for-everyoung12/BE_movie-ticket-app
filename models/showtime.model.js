//Model này giúp bạn quản lý lịch chiếu của từng bộ phim trong các phòng chiếu.
const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  showtime: { type: Date, required: true },
  available_seats: { type: Number, required: true },
  price: { type: Number, required: true }
});

const Showtime = mongoose.model('Showtime', showtimeSchema);
module.exports = Showtime;
