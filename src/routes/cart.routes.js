import { Router } from 'express'
import authenticationUser from "../middlewares/authentication.middlewares.js";
import { createCart, DeleteCart, getCart, getCartById, updateCart } from '../controllers/cart.controller.js';

const router = Router();

router.get('/', authenticationUser, getCart)
router.post('/',authenticationUser, createCart)
router.get('/:id',authenticationUser, getCartById)
router.delete('/:id',authenticationUser, DeleteCart)
router.patch('/:id',authenticationUser, updateCart)

export default router;