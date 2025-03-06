const express = require('express');
const { getSeats, createSeat, updateSeat } = require('../controllers/seat.controller');
const router = express.Router();

router.get('/:roomId', getSeats);

router.post('/', createSeat);

router.post('/book', updateSeat);

module.exports = router;
