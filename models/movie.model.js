const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: [String], required: true },  // Array of genres
  release_date: { type: Date, required: true },
  duration: { type: Number, required: true },  // Duration in minutes
  poster_url: { type: String },
  rating: { type: Number, min: 1, max: 10 }, 
  average_rating: { type: Number, min: 1, max: 10 },
  age_rating: { type: String, enum: ['G', 'PG', 'PG-13', 'R'] },  // Age rating
  trailer_url: { type: String },
  showtimes: [{
    time: { type: Date, required: true },
    available_seats: { type: Number, required: true },
    hall_number: { type: Number, required: true }
  }]
});

movieSchema.index({movie_id: 1});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
