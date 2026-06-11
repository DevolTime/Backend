import { Router } from "express";

const router = Router();

import { createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controllers/category.controllers.js";
import authoriztionUser from "../middlewares/authentication.middleware.js";


// Define rutas de categorias
router.get('/', getCategory);
router.post('/', authoriztionUser, createCategory);
router.get('/:id', authoriztionUser, getCategoryById);
router.delete('/:id', authoriztionUser, deleteCategory);
router.patch('/:id', authoriztionUser, updateCategory);


export default router;