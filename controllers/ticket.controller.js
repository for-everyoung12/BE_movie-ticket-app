// backend/controllers/ticket.controller.js
const TicketService = require('../services/ticket.service');

exports.createTicket = async (req, res) => {
  const ticketData = req.body;
  try {
    const ticket = await TicketService.createTicket(ticketData);
    res.status(201).json(ticket);  // Trả về vé mới tạo
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTickets = async (req, res) => {
  const { userId } = req.params;
  try {
    const tickets = await TicketService.getTicketsByUser(userId);
    res.status(200).json(tickets);  // Trả về danh sách vé của người dùng
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;
  try {
    const ticket = await TicketService.updateTicketStatus(ticketId, status);
    res.status(200).json(ticket);  // Trả về vé đã cập nhật
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  const { ticketId } = req.params;
  try {
    const result = await TicketService.deleteTicket(ticketId);
    res.status(200).json(result);  // Trả về thông báo xóa vé
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
