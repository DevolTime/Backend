import { Router } from "express";

const router = Router();

import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/category.controllers.js";


// Define rutas de categorias
router.get('/', getCategory);
router.delete('/:id', deleteCategory);
router.patch('/:id',updateCategory);
router.post('/', createCategory);


export default router;