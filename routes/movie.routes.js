const express = require('express');
const {getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie} = require('../controllers/movie.controller');
const router = express.Router();

//get
router.get('/', getAllMovies);

//getById
router.get('/:movieId', getMovieById);

//add
router.post('/', addMovie);

//update
router.put('/:movieId', updateMovie);

//delete
router.delete('/:movieId', deleteMovie);

module.exports = router;