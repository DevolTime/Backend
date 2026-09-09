import { Router } from "express";
import authenticationUser from "../middlewares/authentication.middlewares.js";
import { autorizationUser } from "../middlewares/authorization.middlewares.js";
import { ROLES } from "../config/global.config.js";
import upload from "../middlewares/upload.middleware.js"; // Middleware de Multer para la subida de imágenes

// 2. IMPORTACIÓN DE CONTROLADORES
// Funciones que ejecutan la lógica de base de datos para cada acción CRUD
import {
    createCategory,
    deleteCategory,
    getCategory,
    getCategoryById,
    updateCategory
} from "../controllers/category.controllers.js";

// Instancia del enrutador
const router = Router();


// 3. DEFINICIÓN DE RUTAS (ENDPOINTS)
router.get('/', getCategory);


// Usa 'upload.single('image')' para procesar el archivo bajo la clave 'image'
router.post('/', upload.single('image'), createCategory,
    [authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])],
);

router.get('/:id',
    getCategoryById
);

router.delete('/:id', [authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR, ROLES.SUBSCRIBER])],
    deleteCategory
);


// Permite subir una nueva imagen reemplazando la anterior

router.patch('/:id', upload.single('image'), [authenticationUser, autorizationUser([ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR])],
    updateCategory
);

export default router;