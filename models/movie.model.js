const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  genre: { type: [String], required: true },
  release_date: { type: Date, required: true },
  duration: { type: Number, required: true },
  poster_url: { type: String },
  rating: { type: Number, min: 1, max: 10 }, 
  average_rating: { type: Number, min: 1, max: 10 },
  age_rating: { type: String, enum: ['G', 'PG', 'PG-13', 'R'] },
  trailer_url: { type: String }
});

movieSchema.index({ title: 1, release_date: -1 });
const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
