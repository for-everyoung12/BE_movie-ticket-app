const Cinema = require('../models/cinema.model');
const ICinemaService = require('../interfaces/ICinemaService');
class CinemaService extends ICinemaService {
  async getAllCinemas() {
    try {
      return await Cinema.find();
    } catch (error) {
      throw new Error('Error retrieving cinemas');
    }
  }

  async getCinemaById(cinemaId) {
    try {
      return await Cinema.findById(cinemaId);
    } catch (error) {
      throw new Error('Error retrieving cinema');
    }
  }

  async addCinema(cinemaData) {
    try {
      const cinema = new Cinema(cinemaData);
      await cinema.save();
      return cinema;
    } catch (error) {
      throw new Error('Error adding cinema');
    }
  }

  async updateCinema(cinemaId, cinemaData) {
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

  async deleteCinema(cinemaId) {
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
