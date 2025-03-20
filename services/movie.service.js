const Movie = require('../models/movie.model');
const IMovieService = require('../interfaces/IMovieService');
const cloudinary = require('../utils/cloudinary');

class MovieService extends IMovieService {
    async getAllMovies() {
        try {
            return await Movie.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getMovieById(movieId) {
        try {
            const movie = await Movie.findById(movieId);
            if (!movie) {
                throw new Error('Movie not found');
            }
            return movie;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async addMovie(movieData, poster, trailer) {
        try {
          // Upload poster lên Cloudinary
          const posterResult = await cloudinary.uploader.upload(poster.tempFilePath, {
            resource_type: 'image',  // Chỉ upload ảnh
            folder: 'movies/posters', // Tạo thư mục 'movies/posters'
            public_id: 'poster_' + movieData.title, // Đặt tên file theo tên phim
          });
    
          // Upload trailer lên Cloudinary
          const trailerResult = await cloudinary.uploader.upload(trailer.tempFilePath, {
            resource_type: 'video', // Chỉ upload video
            folder: 'movies/trailers', // Tạo thư mục 'movies/trailers'
            public_id: 'trailer_' + movieData.title, // Đặt tên file theo tên phim
          });
    
          // Lưu URL của poster và trailer vào movieData
          movieData.poster_url = posterResult.secure_url;  // Lưu URL của poster
          movieData.trailer_url = trailerResult.secure_url; // Lưu URL của trailer
    
          // Tạo và lưu phim vào MongoDB
          const movie = new Movie(movieData);
          return await movie.save();
        } catch (error) {
          throw new Error(error.message);
        }
      }

    async updateMovie(movieId, movieData) {
        try {
            const movie = await Movie.findByIdAndUpdate(movieId, movieData, { new: true });
            if (!movie) {
                throw new Error('Movie not found');
            }
            return movie
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteMovie(movieId) {
        try {
            const movie = await Movie.findByIdAndDelete(movieId);
            if (!movie) {
                throw new Error('Movie not found');
            }
            return { messsage: 'Movie deleted successfully' };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = MovieService;
