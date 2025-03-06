// backend/services/review.service.js
const Review = require('../models/review.model');
const Movie = require('../models/movie.model');
const User = require('../models/user.model');

class ReviewService {
  static async createReview(reviewData) {
    try {
      const movie = await Movie.findById(reviewData.movie_id);
      if (!movie) {
        throw new Error('Movie not found');
      }

      const user = await User.findById(reviewData.user_id);
      if (!user) {
        throw new Error('User not found');
      }

      const review = new Review(reviewData);
      await review.save();

      const reviews = await Review.find({ movie_id: reviewData.movie_id });
      const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

      movie.average_rating = avgRating;
      await movie.save();

      return review;
    } catch (error) {
      throw new Error('Error adding review');
    }
  }

  static async getReviewsByMovie(movieId) {
    try {
      return await Review.find({ movie_id: movieId }).populate('user_id');
    } catch (error) {
      throw new Error('Error retrieving reviews');
    }
  }

  static async updateReview(reviewId, reviewData) {
    try {
      const review = await Review.findByIdAndUpdate(reviewId, reviewData, { new: true });
      if (!review) {
        throw new Error('Review not found');
      }
      return review;
    } catch (error) {
      throw new Error('Error updating review');
    }
  }

  static async deleteReview(reviewId) {
    try {
      const review = await Review.findByIdAndDelete(reviewId);
      if (!review) {
        throw new Error('Review not found');
      }
      return { message: 'Review deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting review');
    }
  }
}

module.exports = ReviewService;
