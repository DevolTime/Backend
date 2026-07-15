import { Router } from "express";
import { deleteStore, getStore, newStore, updateStore } from "../controllers/stores.controller.js";
import authenticationUser from "../middlewares/authentication.middlewares.js";
import { autorizationUser } from "../middlewares/authorization.middlewares.js";
import { ROLES } from "../config/global.config.js";

const router = Router();
router.post('/', [authenticationUser, autorizationUser([ROLES.ADMIN])], newStore)
router.patch('/:idstore', [authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR])], updateStore)
router.get('/', [authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.AUTHOR, ROLES.EDITOR, ROLES.SUBSCRIBER])], getStore)
router.delete('/:idstore', [authenticationUser, autorizationUser([ROLES.ADMIN])], deleteStore)

export default router