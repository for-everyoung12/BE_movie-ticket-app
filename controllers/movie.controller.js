const MovieService = require('../services/movie.service');

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await MovieService.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getMovieById = async (req, res) => {
    const { movieId } = req.params;
    try {
        const movie = await MovieService.getMovieById(movieId);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addMovie = async (req, res) => {
    const movieData = req.body;
    try {
        const movie = await MovieService.addMovie(movieData);
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateMovie = async (req, res) => {
    const { movieId } = req.params;
    const movieData = req.body;
    try {
        const movie = await MovieService.updateMovie(movieId, movieData);
        res.status(200).json(movie);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteMovie = async (req, res) => {
    const { movieId} = req.params;
    try {
        const result = await MovieService.deleteMovie(movieId);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}