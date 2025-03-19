const express = require("express");

module.exports = (reviewController) => {
    const router = express.Router();

    router.post("/", reviewController.createReview.bind(reviewController));

    router.get("/:movieId", reviewController.getReviews.bind(reviewController));

    router.put("/:reviewId", reviewController.updateReview.bind(reviewController));

    router.delete("/:reviewId", reviewController.deleteReview.bind(reviewController));
    return router;
};
