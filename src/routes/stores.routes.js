import { Router } from "express";
import { deleteStore, getStore, newStore, updateStore } from "../controllers/stores.controller.js";

const router = Router();
router.post('/',newStore)
router.patch ('/:idstore',updateStore)
router.get('/',getStore)
router.delete('/:idstore',deleteStore)


export default router