import { Router } from "express";
import { newUser } from "../controllers/users.controller.js";
import { loginUser, reNewToken } from "../controllers/auth.controller.js";
import authenticationUser from "../middlewares/authentication.middlewares.js";
import { removeRole } from "../middlewares/without.role.middeware.js";
import { autorizationUser } from "../middlewares/authorization.middlewares.js";
import { ROLES } from "../config/global.config.js";

const router = Router();
//define las rutas que manejan el flujo de la autentificacion 


// login 
router.post('/login', loginUser)
// registrer
router.post('/register', removeRole, newUser)


//renew token 
router.get('/renew-token', [authenticationUser, autorizationUser([ROLES.ADMIN])], reNewToken)

//remember paswrod 
// remeber user
//renew token 
//activated accountcece
//activate accoun
//double authentication

export default router
