import { Router } from "express";
import authenticationUser from "../middlewares/authentication.middlewares.js";

const router = Router();

import { createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controllers/category.controllers.js";


// Define rutas de categorias
router.get('/', getCategory);
router.post('/', authenticationUser,  createCategory);
router.get('/:id',authenticationUser, getCategoryById);
router.delete('/:id', authenticationUser, deleteCategory);
router.patch('/:id', authenticationUser, updateCategory);
export default router;
