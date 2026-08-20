import { Router } from 'express'
import authenticationUser from "../middlewares/authentication.middlewares.js";
import { addItemToCart, clearCart, createCart, getCart, getCartById, removeItemFromCart, updateCart } from '../controllers/cart.controller.js';
import { autorizationUser } from "../middlewares/authorization.middlewares.js";
import { ROLES } from "../config/global.config.js";

const router = Router();

router.get('/', [authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], getCart);
router.post('/items', [authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], addItemToCart);
router.get('/:id', [authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], getCartById);
router.patch('/items/:productId', [authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], updateCart);
router.delete('/items/:productId', [authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], removeItemFromCart);
router.delete('/', [authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], clearCart);

export default router;