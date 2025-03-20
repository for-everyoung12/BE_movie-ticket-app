const express = require('express');
const expressFileUpload = require('express-fileupload');
module.exports = (movieController) => {
    const router = express.Router();

    // Middleware để xử lý file upload
    router.use(expressFileUpload());
    
    router.get('/', movieController.getAllMovies.bind(movieController));
    router.get('/:movieId', movieController.getMovieById.bind(movieController));
    router.post('/', movieController.addMovie.bind(movieController));
    router.put('/:movieId', movieController.updateMovie.bind(movieController));
    router.delete('/:movieId', movieController.deleteMovie.bind(movieController));

    return router;
}