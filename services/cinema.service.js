const Cinema = require('../models/cinema.model');

class CinemaService {
  static async getAllCinemas() {
    try {
      return await Cinema.find();
    } catch (error) {
      throw new Error('Error retrieving cinemas');
    }
  }

  static async getCinemaById(cinemaId) {
    try {
      return await Cinema.findById(cinemaId);
    } catch (error) {
      throw new Error('Error retrieving cinema');
    }
  }

  static async addCinema(cinemaData) {
    try {
      const cinema = new Cinema(cinemaData);
      await cinema.save();
      return cinema;
    } catch (error) {
      throw new Error('Error adding cinema');
    }
  }

  static async updateCinema(cinemaId, cinemaData) {
    try {
      const cinema = await Cinema.findByIdAndUpdate(cinemaId, cinemaData, { new: true });
      if (!cinema) {
        throw new Error('Cinema not found');
      }
      return cinema;
    } catch (error) {
      throw new Error('Error updating cinema');
    }
  }

  static async deleteCinema(cinemaId) {
    try {
      const cinema = await Cinema.findByIdAndDelete(cinemaId);
      if (!cinema) {
        throw new Error('Cinema not found');
      }
      return { message: 'Cinema deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting cinema');
    }
  }
}

module.exports = CinemaService;
