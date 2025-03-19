// backend/controllers/ticket.controller.js
const TicketService = require('../services/ticket.service');

class TicketController {
  constructor(ticketService) {
    this.ticketService = ticketService;
  }
  async createTicket(req, res) {
    const ticketData = req.body;
    try {
      const ticket = await this.ticketService.createTicket(ticketData);
      res.status(201).json(ticket);  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  async getTicketsByUser(req, res) {
    const { userId } = req.params;
    try {
      const tickets = await this.ticketService.getTicketsByUser(userId);
      res.status(200).json(tickets); 
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  async updateTicket(req, res) {
    const { ticketId } = req.params;
    const { status } = req.body;
    try {
      const ticket = await this.ticketService.updateTicketStatus(ticketId, status);
      res.status(200).json(ticket);  // Trả về vé đã cập nhật
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  async deleteTicket(req, res) {
    const { ticketId } = req.params;
    try {
      const result = await this.ticketService.deleteTicket(ticketId);
      res.status(200).json(result);  // Trả về thông báo xóa vé
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

}

module.exports = TicketController;