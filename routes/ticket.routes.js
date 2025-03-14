const express = require('express');

module.exports = (ticketController) => {
    const router = express.Router();

    router.post('/', ticketController.createTicket.bind(ticketController));

    router.get('/:userId', ticketController.getTicketsByUser.bind(ticketController));

    router.put('/:ticketId', ticketController.updateTicket.bind(ticketController));

    router.delete('/:ticketId', ticketController.deleteTicket.bind(ticketController));
    
    return router;
}