import { Router } from "express";

const router = Router();

import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/category.controllers.js";


// Define rutas de categorias
router.get('/', getCategory)
router.delete('/', deleteCategory)
router.patch('/',updateCategory)
router.post('/', createCategory)


export default router;