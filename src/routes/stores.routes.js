import { Router } from "express";
import { deleteStore, getStore, newStore, updateStore } from "../controllers/stores.controller.js";
import authenticationUser from "../middlewares/authentication.middlewares.js";

const router = Router();
router.post('/',authenticationUser, newStore)
router.patch('/:idstore',authenticationUser, updateStore)
router.get('/',getStore)
router.delete('/:idstore',authenticationUser, deleteStore)


export default router