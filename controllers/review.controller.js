// backend/controllers/review.controller.js
const ReviewService = require('../services/review.service');

exports.createReview = async (req, res) => {
  const reviewData = req.body;
  try {
    const review = await ReviewService.createReview(reviewData);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReviews = async (req, res) => {
  const { movieId } = req.params;
  try {
    const reviews = await ReviewService.getReviewsByMovie(movieId);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const reviewData = req.bzody;
  try {
    const review = await ReviewService.updateReview(reviewId, reviewData);
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const result = await ReviewService.deleteReview(reviewId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
