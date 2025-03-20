// backend/controllers/review.controller.js
const ReviewService = require('../services/review.service');

class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

    async createReview (req, res){
    const reviewData = req.body;
    try {
      const review = await this.reviewService.createReview(reviewData);
      res.status(201).json(review);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  async getReviews (req, res){
    const { movieId } = req.params;
    try {
      const reviews = await this.reviewService.getReviewsByMovie(movieId);
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  async updateReview  (req, res){
    const { reviewId } = req.params;
    const reviewData = req.body;
    try {
      const review = await this.reviewService.updateReview(reviewId, reviewData);
      res.status(200).json(review);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  async deleteReview  (req, res){
    const { reviewId } = req.params;
    try {
      const result = await this.reviewService.deleteReview(reviewId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
}

module.exports = ReviewController;