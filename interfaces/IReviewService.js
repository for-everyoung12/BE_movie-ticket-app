class IReviewService{
    async createReview(reviewData) {}
    async getReviewsByMovie(movieId) {}
    async updateReview(reviewId, reviewData) {}
    async deleteReview(reviewId) {}
}
module.exports = IReviewService;