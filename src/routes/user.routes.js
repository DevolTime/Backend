import { Router } from "express";

const router = Router();

import { getUsers, deleteUser, updateUser, newUser} from '../controllers/users.controller.js';


// Definicion de las rutas para lso usuarios
router.get('/',getUsers)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

router.post('/', newUser)

export default router;