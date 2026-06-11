import {Router} from 'express'
import { newUser } from '../controllers/users.controller.js';
import { loginUser, reNewToken } from '../controllers/auth.controllers.js';
import authoriztionUser from '../middlewares/authentication.middleware.js';

const router = Router();

// Define las rutas que manejan el flujo de autentificacion
// login 
router.post('/login', loginUser)

// register
router.post('/register', newUser)

// renew-token
router.get('/renew-token', authoriztionUser, reNewToken)


// remember-password
// remember-user
// activate-account
// deactivated-account
//double-authentication

export default router;