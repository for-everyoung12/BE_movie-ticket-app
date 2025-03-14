class ITicketService {
    async createTicket(ticketData) {
        throw new Error('Not implemented');
    }
    async getTicketsByUser(userId) {
        throw new Error('Not implemented');
    }
    async updateTicketStatus(ticketId, status) {
        throw new Error('Not implemented');
    }
    async deleteTicket(ticketId) {
        throw new Error('Not implemented');
    }

}

module.exports = ITicketService;