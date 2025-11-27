import { Router } from 'express';
import { createTicket } from '../controllers/Ticket.Controller.js';
export const router=Router()

router.post('/', createTicket)