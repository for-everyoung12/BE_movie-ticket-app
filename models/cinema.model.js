// backend/models/cinema.model.js
const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  total_rooms: { type: Number, required: true }
});

const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;
