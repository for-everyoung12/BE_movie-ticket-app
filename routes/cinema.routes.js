const express = require('express');
const { getCinemas, getCinemaById, addCinema, updateCinema, deleteCinema } = require('../controllers/cinema.controller');
const router = express.Router();

router.get('/', getCinemas);

router.get('/:cinemaId', getCinemaById);

router.post('/', addCinema);

router.put('/:cinemaId', updateCinema);

router.delete('/:cinemaId', deleteCinema);

module.exports = router;
