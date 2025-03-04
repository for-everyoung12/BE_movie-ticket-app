// backend/controllers/cinema.controller.js
const CinemaService = require('../services/cinema.service');

exports.getCinemas = async (req, res) => {
  try {
    const cinemas = await CinemaService.getAllCinemas();
    res.status(200).json(cinemas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCinemaById = async (req, res) => {
  const { cinemaId } = req.params;
  try {
    const cinema = await CinemaService.getCinemaById(cinemaId);
    res.status(200).json(cinema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addCinema = async (req, res) => {
  const cinemaData = req.body;
  try {
    const cinema = await CinemaService.addCinema(cinemaData);
    res.status(201).json(cinema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCinema = async (req, res) => {
  const { cinemaId } = req.params;
  const cinemaData = req.body;
  try {
    const cinema = await CinemaService.updateCinema(cinemaId, cinemaData);
    res.status(200).json(cinema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCinema = async (req, res) => {
  const { cinemaId } = req.params;
  try {
    const result = await CinemaService.deleteCinema(cinemaId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
