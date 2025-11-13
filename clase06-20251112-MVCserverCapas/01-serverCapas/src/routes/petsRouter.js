import { Router } from 'express';
import { createPet, getPets } from '../controller/Pets.controller.js';
export const router=Router()

router.get('/', getPets)
router.post("/", createPet)