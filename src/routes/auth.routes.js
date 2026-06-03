import {Router} from 'express'
import { newUser } from '../controllers/users.controller.js';
import { loginUser } from '../controllers/auth.controllers.js';

const router = Router();

// Define las rutas que manejan el flujo de autentificacion
// login 
router.post('/login', loginUser)

// register
router.post('/register', newUser)
// remember-password
// remember-user
// renew-token
// activate-account
// deactivated-account
//double-authentication

export default router;