import { Router } from 'express';
import { UsersController } from '../controller/Users.controller.js';
export const router=Router()

router.get('/', UsersController.getUsers)
router.post("/", UsersController.createUser)