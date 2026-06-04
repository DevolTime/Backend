import {Router } from "express";
import { newUser } from "../controllers/users.controller.js";
import { loginUser } from "../controllers/Auth.controller.js";
const router = Router();
 //define las rutas que manejan el flujo de la autentificacion 


// login 
router.post('/login', loginUser )
// registrer
router.post('/register',newUser )

//renew token 


//remember paswrod 
// remeber user
//renew token 
//activated accountcece
//activate accoun
//double authentication

export default router