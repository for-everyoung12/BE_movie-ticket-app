// backend/routes/cinema.routes.js
const express = require('express');
const { getCinemas, getCinemaById, addCinema, updateCinema, deleteCinema } = require('../controllers/cinema.controller');
const router = express.Router();

// Route lấy tất cả các rạp chiếu
router.get('/', getCinemas);

// Route lấy thông tin chi tiết của bộ phim
router.get('/:cinemaId', getCinemaById);

// Route thêm rạp chiếu mới
router.post('/', addCinema);

// Route cập nhật rạp chiếu
router.put('/:cinemaId', updateCinema);

// Route xóa rạp chiếu
router.delete('/:cinemaId', deleteCinema);

module.exports = router;
