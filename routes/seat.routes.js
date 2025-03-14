const express = require('express');

module.exports = (seatController) => {
    const router = express.Router();

    router.get('/:roomId', seatController.getSeats.bind(seatController));
    
    router.post('/', seatController.createSeat.bind(seatController));
    
    router.post('/book', seatController.updateSeat.bind(seatController));
    
    return router;
}
