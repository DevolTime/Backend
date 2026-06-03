import {Router } from "express";
import { newUser } from "../controllers/users.controller.js";
const router = Router();
 //define las rutas que manejan el flujo de la autentificacion 


// login 
// registrer
router.post('/register',newUser )
//remember paswrod 
// remeber user
//renew token 
//activated account
//activate accoun
//double authentication

export default router