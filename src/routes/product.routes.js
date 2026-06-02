import { Router } from "express";
import { getproducts ,deleteproductos, postproducts, patchproducts, getproductsById } from "../controllers/product.controller.js";



const router = Router ();

// define rutas para productos
router.get ("/" , getproducts) ;
router.get("/:id", getproductsById);
router.delete ("/:id", deleteproductos);
router.post ("/", postproducts);
router.patch("/:id", patchproducts );

export default router;
