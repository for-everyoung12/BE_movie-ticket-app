//model Room để lưu thông tin về các phòng chiếu và số lượng ghế trong mỗi phòng.
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  cinema_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
  hall_number: { type: Number, required: true },
  total_seats: { type: Number, required: true }
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;