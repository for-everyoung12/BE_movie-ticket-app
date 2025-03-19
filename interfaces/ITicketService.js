class ITicketService {
    async createTicket(ticketData) {}
    async getTicketsByUser(userId) {}
    async updateTicketStatus(ticketId, status) {}
    async deleteTicket(ticketId) {}

}

module.exports = ITicketService;