import { Router } from 'express'
import { createCart, DeleteCart, getCart, getCartById, updateCart } from '../controllers/cart.controller.js';

const router = Router();

router.get('/', getCart)
router.post('/', createCart)
router.get('/:id', getCartById)
router.delete('/:id', DeleteCart)
router.patch('/:id', updateCart)

export default router;