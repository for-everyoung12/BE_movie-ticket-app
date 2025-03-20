const express = require('express');

module.exports = (roomController)=>{
    const  router = express.Router();

    router.get('/',roomController.getAllRooms.bind(roomController));
    router.get('/:roomId',roomController.getRoomById.bind(roomController));
    router.post('/',roomController.addRoom.bind(roomController));
    router.put('/:roomId',roomController.updateRoom.bind(roomController));
    router.delete('/:roomId',roomController.deleteRoom.bind(roomController));
    
    return router;
}