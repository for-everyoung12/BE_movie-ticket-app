const SeatService = require('../services/seat.service');

class SeatController{
  constructor(seatService){
    this.seatService = seatService;
  }
   async getSeats (req, res){
    const { roomId } = req.params;
    try {
      const seats = await this.seatService.getSeatsByRoom(roomId);
      res.status(200).json(seats);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  async createSeat (req, res){
    const { room_id, showtime_id, totalSeats, status } = req.body;
  
    console.log("Request body:", req.body);
  
    if (!totalSeats || totalSeats <= 0) {
        return res.status(400).json({ error: 'totalSeats is required and must be a positive number' });
    }
  
    try {
        const result = await this.seatService.createSeat(showtime_id, room_id, totalSeats, status);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  
  async updateSeat (req, res){
    const seatData = req.body;
    try {
      const seat = await this.seatService.updateSeatStatus(seatData);
      res.status(200).json(seat);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
}

module.exports = SeatController;