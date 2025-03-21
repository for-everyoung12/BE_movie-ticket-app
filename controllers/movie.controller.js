const MovieService = require("../services/movie.service");

class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async getAllMovies(req, res) {
        try {
            const movies = await this.movieService.getAllMovies();
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getMovieById(req, res) {
        const { movieId } = req.params;
        try {
            const movie = await this.movieService.getMovieById(movieId);
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addMovie(req, res) {
        try {
            const movieData = req.body;

            if (req.file) {
                movieData.poster_url = req.file.path; // Lưu URL ảnh từ Cloudinary
            }

            const movie = await this.movieService.addMovie(movieData);
            res.status(201).json(movie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateMovie(req, res) {
        const { movieId } = req.params;
        const movieData = req.body;
        try {
            const movie = await this.movieService.updateMovie(movieId, movieData);
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteMovie(req, res) {
        const { movieId } = req.params;
        try {
            const result = await this.movieService.deleteMovie(movieId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = MovieController;
