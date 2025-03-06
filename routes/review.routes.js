const express = require('express');
const { createReview, getReviews, updateReview, deleteReview } = require('../controllers/review.controller');
const router = express.Router();

router.post('/', createReview);

router.get('/:movieId', getReviews);

router.put('/:reviewId', updateReview);

router.delete('/:reviewId', deleteReview);

module.exports = router;
