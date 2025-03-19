const CinemaService = require('../services/cinema.service');

class CinemaController{
    constructor(cinemaService){
       this.cinemaService = cinemaService;
    }

  async getAllCinemas (req, res){
    try {
      const cinemas = await this.cinemaService.getAllCinemas();
      res.status(200).json(cinemas);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  async getCinemaById (req, res) {
    const { cinemaId } = req.params;
    try {
      const cinema = await this.cinemaService.getCinemaById(cinemaId);
      res.status(200).json(cinema);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  async addCinema (req, res){
    const cinemaData = req.body;
    try {
      const cinema = await this.cinemaService.addCinema(cinemaData);
      res.status(201).json(cinema);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  async updateCinema (req, res){
    const { cinemaId } = req.params;
    const cinemaData = req.body;
    try {
      const cinema = await this.cinemaService.updateCinema(cinemaId, cinemaData);
      res.status(200).json(cinema);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  async deleteCinema (req, res){
    const { cinemaId } = req.params;
    try {
      const result = await this.cinemaService.deleteCinema(cinemaId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
}

module.exports = CinemaController;