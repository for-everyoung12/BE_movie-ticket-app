class ISeatService{
    async getSeatsByRoom(roomId){
        throw new Error('Method not implemented');
    }
    async createSeat(seatData){
        throw new Error('Method not implemented');
    }
    async updateSeatStatus(seatData){
        throw new Error('Method not implemented');
    }
}

module.exports = ISeatService;