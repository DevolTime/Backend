import { Router } from "express";
import authenticationUser from "../middlewares/authentication.middlewares.js";
import { autorizationUser } from "../middlewares/authorization.middlewares.js";
import { ROLES } from "../config/global.config.js";

import upload from "../middlewares/upload.middleware.js";

import { createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controllers/category.controllers.js";

const router = Router();

// Define rutas de categorias
router.get('/', getCategory);

router.post('/', upload.single('image'), createCategory
    //[authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], 
);

router.get('/:id', 
    //[authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], 
    getCategoryById);

router.delete('/:id',
    //[authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])], 
    deleteCategory);

router.patch('/:id', upload.single('image'),
    //[authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR])], 
    updateCategory);

export default router;
