const express = require('express');

module.exports = (roomControlller)=>{
    const  router = express.Router();

    router.get('/',roomControlller.getAllRooms.bind(roomControlller));
    router.get('/:roomId',roomControlller.getRoomById.bind(roomControlller));
    router.post('/',roomControlller.addRoom.bind(roomControlller));
    router.put('/:roomId',roomControlller.updateRoom.bind(roomControlller));
    router.delete('/:roomId',roomControlller.deleteRoom.bind(roomControlller));
    
    return router;
}