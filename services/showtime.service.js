const Showtime = require('../models/showtime.model');
const Movie = require('../models/movie.model');
const Room = require('../models/room.model');
const Seat = require('../models/seat.model');
const mongoose = require('mongoose');
const IShowtimeService = require('../interfaces/IShowtimeService');
class ShowtimeService extends IShowtimeService {

    async getAllShowtime() {    
        try {
            const showtimes = await Showtime.find()
                .populate('movie_id') 
                .populate('room_id'); 

            // Lấy số ghế trống cho mỗi lịch chiếu
            for (let showtime of showtimes) {
                const availableSeats = await Seat.countDocuments({
                    showtime_id: showtime._id,
                    status: 'available'
                });
                showtime = showtime.toObject();
                showtime.available_seats = availableSeats;
            }

            return showtimes;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getShowtimeByMovies(movieId) {
        try {
            const showtimes = await Showtime.find({ movie_id: movieId })
                .populate('movie_id')
                .populate('room_id');

            //lấy số ghế trống = check status 'availale' trong seat
            for (let showtime of showtimes) {
                const availableSeats = await Seat.countDocuments({
                    showtime_id: showtime._id,
                    status: 'available'
                });
                showtime = showtime.toObject();
                showtime.available_seats = availableSeats;
            }
            return showtimes;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addShowtime(showtimeData) {
        try {
            const movie = await Movie.findById(showtimeData.movie_id);
            if (!movie) {
                throw new Error('Movie not found');
            }

            const room = await Room.findById(showtimeData.room_id);
            if (!room) {
                throw new Error('Room not found');
            }

            const showtime = new Showtime(showtimeData);
            return await showtime.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateShowtime(showtimeId, showtimeData) {
        try {
            const showtime = Showtime.findByIdAndUpdate(showtimeId, showtimeData, { new: true });
            if (!showtime) {
                throw new Error('Showtime not found');
            }
            return showtime;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteShowtime(showtimeId) {
        try {
          const showtime = await Showtime.findByIdAndDelete(showtimeId);
          if (!showtime) {
            throw new Error('Showtime not found');
          }
      
          await Seat.deleteMany({ showtime_id: new mongoose.Types.ObjectId(showtimeId) });
      
          return { message: 'Showtime deleted successfully' };
        } catch (error) {
          throw new Error(error.message);
        }
      }
}

module.exports = ShowtimeService;