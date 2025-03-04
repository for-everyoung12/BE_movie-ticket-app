const Room = require('../models/room.model');

class RoomService {
    static async getAllRooms(){
        try {
            return await Room.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getRoomById(roomId){
        try {
            const room = await Room.findById(roomId);
            if(!room){
                throw new Error('Room not found');
            }
            return room;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async addRoom(roomData){
        try {
            const room = new Room(roomData);
            return await room.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateRoom(roomId, roomData){
        try {
            const room = await Room.findByIdAndUpdate(roomId, roomData, {new: true});
            if(!room){
                throw new Error('Room not found');
            }
            return room;
        }catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteRoom(roomId){
        try {
            const room = await Room.findByIdAndDelete(roomId);
            if(!room){
                throw new Error('Room not found');
            }
            return {message: 'Room deleted successfully'};
        } catch (error) {
            throw new Error (error.message);
        }
    }

}

module.exports = RoomService;