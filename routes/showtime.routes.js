const express = require('express');
const  router = express.Router();
const {getShowtimeByMovies, addShowtime, updateShowtime, deleteShowtime} = require('../controllers/showtime.controller');


router.get('/',getShowtimeByMovies);
router.post('/',addShowtime);
router.put('/:showtimeId',updateShowtime);
router.delete('/:showtimeId',deleteShowtime);

module.exports = router;
