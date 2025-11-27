import { MemoryClientesDAO } from "../dao/MemoryClientesDAO.js";
import { MemoryProductosDAO } from "../dao/MemoryProductosDAO.js";
import { MemoryTicketsDAO } from "../dao/MemoryTicketsDAO.js";
import { ClientesRepository } from "../repository/ClientesRepository.js";
import { ProductosRepository } from "../repository/ProductosRepository.js";
import { TicketRepository } from "../repository/TicketRepository.js";
import { TicketService } from "../service/Ticket.service.js";

const clientesDAO=new MemoryClientesDAO()
const clientesRepository=new ClientesRepository(clientesDAO)

const productosDAO=new MemoryProductosDAO()
const productosRepository=new ProductosRepository(productosDAO)

const ticketDAO=new MemoryTicketsDAO()
const ticketRepository=new TicketRepository(ticketDAO)

export const ticketService=new TicketService(
    clientesRepository, 
    productosRepository, 
    ticketRepository
)

// ticketService.createTicket()