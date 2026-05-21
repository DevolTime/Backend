import { Router } from "express";

const router = Router();

import { getUsers, deleteUser, updateUser, newUser} from '../controllers/users.controller.js';


// Definicion de las rutas para los usuarios
router.get('/',getUsers)

router.delete('/', deleteUser)

router.patch('/', updateUser)

router.post('/', newUser)

export default router;