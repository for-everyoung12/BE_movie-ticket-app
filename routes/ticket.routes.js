const express = require('express');
const { createTicket, getTickets, updateTicket, deleteTicket } = require('../controllers/ticket.controller');
const router = express.Router();

router.post('/', createTicket);

router.get('/:userId', getTickets);

router.put('/:ticketId', updateTicket);

router.delete('/:ticketId', deleteTicket);

module.exports = router;
