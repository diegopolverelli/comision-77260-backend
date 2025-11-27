export class TicketRepository{
    constructor(dao){
        this.ticketDAO=dao
    }

    async createTicket(ticket){
        return await this.ticketDAO.save(ticket)
    }
}