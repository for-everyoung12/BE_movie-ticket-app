const express = require('express');

module.exports = (movieController) => {
    const router = express.Router();

    router.get('/', movieController.getAllMovies.bind(movieController));
    router.get('/:movieId', movieController.getMovieById.bind(movieController));
    router.post('/', movieController.addMovie.bind(movieController));
    router.put('/:movieId', movieController.updateMovie.bind(movieController));
    router.delete('/:movieId', movieController.deleteMovie.bind(movieController));

    return router;
}