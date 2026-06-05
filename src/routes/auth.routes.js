import {Router } from "express";
import { newUser } from "../controllers/users.controller.js";
import { loginUser, reNewToken } from "../controllers/Auth.controller.js";
import authenticationUser from "../middlewares/authentication.middlewares.js";
const router = Router();
 //define las rutas que manejan el flujo de la autentificacion 


// login 
router.post('/login', loginUser )
// registrer
router.post('/register',newUser )

//renew token 
router.get('/renew-token', authenticationUser, reNewToken )

//remember paswrod 
// remeber user
//renew token 
//activated accountcece
//activate accoun
//double authentication

export default router