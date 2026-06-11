import { Router } from "express";
import { getproducts ,deleteproductos, postproducts, patchproducts, getproductsById } from "../controllers/product.controller.js";

import authenticationUser from "../middlewares/authentication.middlewares.js";

const router = Router ();

// define rutas para productos
router.get ("/" , getproducts) ;
router.get("/:id",authenticationUser, getproductsById);
router.delete ("/:id",authenticationUser, deleteproductos);
router.post ("/", authenticationUser,postproducts);
router.patch("/:id",authenticationUser,  patchproducts );

export default router;
