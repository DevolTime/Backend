import { Router } from "express";

const router = Router();

import { createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controllers/category.controllers.js";


// Define rutas de categorias
router.get('/', getCategory);
router.post('/', createCategory);
router.get('/:id', getCategoryById);
router.delete('/:id', deleteCategory);
router.patch('/:id', updateCategory);


export default router;