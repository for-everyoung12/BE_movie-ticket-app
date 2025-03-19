const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  location: { 
    address: { type: String, required: true },
    coordinates: {type: {lat: Number, lng: Number}, required: false} //Tìm kiếm theo vị trí
  },
  total_rooms: { type: Number, required: true }
});

const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;
