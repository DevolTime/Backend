import { Router } from "express";

const router = Router();

import { getUsers, deleteUser, updateUser, newUser, getUserById } from '../controllers/users.controller.js';

import authenticationUser from "../middlewares/authentication.middlewares.js";
import { autorizationUser } from "../middlewares/authorization.middlewares.js";
import { ROLES } from "../config/global.config.js";
// Definicion de las rutas para los usuarios

router.post('/',
    //[authenticationUser,autorizationUser([ROLES.ADMIN])],
     newUser)
     
router.get('/',//[authenticationUser,autorizationUser([ROLES.ADMIN])]
getUsers)

router.get('/:id',getUserById)

router.delete('/:id',
    // [authenticationUser,autorizationUser([ROLES.ADMIN])],
    deleteUser)

router.patch('/:id',
    //[authenticationUser,autorizationUser([ROLES.ADMIN])],
     updateUser)

export default router;