import { Router } from "express";

const router = Router();

import { getUsers, deleteUser, updateUser, newUser } from '../controllers/users.controller.js';

import authenticationUser from "../middlewares/authentication.middlewares.js";
// Definicion de las rutas para los usuarios
router.get('/', getUsers)

router.delete('/:id',authenticationUser, deleteUser)

router.patch('/:id',authenticationUser, updateUser)

router.post('/',authenticationUser, newUser)

export default router;