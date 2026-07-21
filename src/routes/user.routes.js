import { Router } from "express";

const router = Router();

import { getUsers, deleteUser, updateUser, newUser } from '../controllers/users.controller.js';

import authenticationUser from "../middlewares/authentication.middlewares.js";
import { autorizationUser } from "../middlewares/authorization.middlewares.js";
import { ROLES } from "../config/global.config.js";
// Definicion de las rutas para los usuarios
router.get('/', [authenticationUser, autorizationUser([ROLES.ADMIN])], getUsers)

router.delete('/:id', [authenticationUser, autorizationUser([ROLES.ADMIN])], deleteUser)

router.patch('/:id', [authenticationUser, autorizationUser([ROLES.ADMIN])], updateUser)

router.post('/', [authenticationUser, autorizationUser([ROLES.ADMIN])], newUser)
<<<<<<< HEAD

=======
>>>>>>> 2644a8c9102dc05fcd35437a520e253e4f61b8ca

export default router;