const Movie = require('../models/movie.model');

class MovieService {
    static async getAllMovies(){
        try {
            return await Movie.find();
        } catch (error) {  
            throw new Error(error.message);
        }
    }

    static async getMovieById(movieId){
        try {
            const movie = await Movie.findById(movieId);
            if(!movie){
                throw new Error('Movie not found');
            }
            return movie;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    static async addMovie(movieData){
        try {
            const movie = new Movie(movieData);
            return await movie.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateMovie(movieId, movieData){
        try {
            const movie = await Movie.findByIdAndUpdate(movieId, movieData, {new: true});
            if(!movie){
                throw new Error('Movie not found');
            }
            return movie
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    static async deleteMovie(movieId){
        try {
            const movie = await Movie.findByIdAndDelete(movieId);
            if(!movie){
                throw new Error('Movie not found');
            }
            return {messsage: 'Movie deleted successfully'};
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = MovieService;
