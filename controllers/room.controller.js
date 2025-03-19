const RoomService  = require('../services/room.service');

class RoomControlller{

    constructor(roomController){
        this.roomController = roomController;
    }
    
    async getAllRooms (req, res){
        try {
            const rooms = await this.roomService.getAllRooms();
            res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async getRoomById (req, res){
        try {
            const {roomId} = req.params;
            const rooms = await this.roomService.getRoomById(roomId)
            res.status(200).json(rooms);    
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async addRoom (req, res){
        try {
            const roomData = req.body;
            const room = await this.roomService.addRoom(roomData); 
            res.status(200).json(room);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async updateRoom (req, res){
        try {
            const {roomId} = req.params;
            const roomData = req.body;
            const room = await this.roomService.updateRoom(roomId, roomData);
            res.status(200).json(room);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async deleteRoom (req, res){
        try {
            const {roomId} = req.params;
            const result = await this.roomService.deleteRoom(roomId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = RoomControlller;