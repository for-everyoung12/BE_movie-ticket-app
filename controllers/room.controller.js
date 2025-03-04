const RoomService  = require('../services/room.service');

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await RoomService.getAllRooms();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getRoomById = async (req, res) => {
    try {
        const {roomId} = req.params;
        const rooms = await RoomService.getRoomById(roomId)
        res.status(200).json(rooms);    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addRoom = async (req, res) => {
    try {
        const roomData = req.body;
        const room = await RoomService.addRoom(roomData); 
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateRoom = async (req, res) => {
    try {
        const {roomId} = req.params;
        const roomData = req.body;
        const room = await RoomService.updateRoom(roomId, roomData);
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        const {roomId} = req.params;
        const result = await RoomService.deleteRoom(roomId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}