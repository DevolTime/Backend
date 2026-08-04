import { Router } from "express";
import { getproducts, deleteproductos, postproducts, patchproducts, getproductsById } from "../controllers/product.controller.js";

import authenticationUser from "../middlewares/authentication.middlewares.js";
import { autorizationUser } from "../middlewares/authorization.middlewares.js";
import { ROLES } from "../config/global.config.js";
import upload from "../middlewares/productUpload.middleware.js"

const router = Router();

// define rutas para productos


router.get ("/" , getproducts) ;

router.get("/:id",
    //[authenticationUser,autorizationUser([ROLES.ADMIN])], 
    getproductsById);

router.delete ("/:id",
    //[authenticationUser,autorizationUser([ROLES.ADMIN, ROLES.EDITOR])], 
    deleteproductos);

router.post ("/", upload.single('urlImage'),
    //[authenticationUser,autorizationUser([ROLES.ADMIN, ROLES.EDITOR])],
    postproducts);

router.patch("/:id", upload.single('urlImage'),
    //[authenticationUser,autorizationUser([ROLES.ADMIN, ROLES.EDITOR])],  
    patchproducts );

export default router;
