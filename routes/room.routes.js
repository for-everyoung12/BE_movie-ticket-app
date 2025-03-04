const express = require('express');
const  router = express.Router();
const {getAllRooms,getRoomById,addRoom,updateRoom,deleteRoom} = require('../controllers/room.controller');

router.get('/',getAllRooms);
router.get('/:roomId',getRoomById);
router.post('/',addRoom);
router.put('/:roomId',updateRoom);
router.delete('/:roomId',deleteRoom);

module.exports = router;