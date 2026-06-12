import { Router } from 'express'
import authenticationUser from "../middlewares/authentication.middlewares.js";
import { createCart, DeleteCart, getCart, getCartById, updateCart } from '../controllers/cart.controller.js';
import { autorizationUser } from "../middlewares/authorization.middlewares.js";
import { ROLES } from "../config/global.config.js";

const router = Router();

router.get('/', [authenticationUser,autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], getCart)
router.post('/',[authenticationUser,autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], createCart)
router.get('/:id',[authenticationUser,autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], getCartById)
router.delete('/:id',[authenticationUser,autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], DeleteCart)
router.patch('/:id',[authenticationUser,autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], updateCart)

export default router;