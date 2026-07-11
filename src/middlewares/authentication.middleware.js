import { verifyToken } from "../bcrypt.helper/jwt.helper.js";
import { dbGetUserByEmail } from "../services/user.services.js";

const authoriztionUser = async (req, res, next) => {
    // 1 - Obtengo la cadena que contiene el Token
    const token = req.header('X-Token')

    if (! token) {
        return res.status(401).json({
            msg: 'Cadena de token vacio'
        })
    }
    // 2 - Verificar "formato" del token

    const tokenParts = token.split('.');

if (tokenParts.length !== 3) {
    return res.status(400).json({
        msg: 'Formato del Token invalido'
    })
}

    // 3 - Verificar la autentificacion del token y extraer el payload

    const payload = verifyToken(token)

    if (! payload) {
        return res.status(400).json({
            msg: 'Token invalido o Inactivo'
        })
    }

    // 4 - Verificar si el usuario dentro del payload del token existe y sigue activo
    const userFound = await dbGetUserByEmail(payload.email)

    if (!userFound) {
        return res.status(400).json({
            msg: 'No es posible generear el nuevo token'
        })
    }

    // 5 - Eliminar las propiedades innecesarias para crear el payload para el nuevo token
    const userFoundObj = userFound.toObject()

    delete userFoundObj.password;
    delete userFoundObj.createdAt;
    delete userFoundObj.updatedAt;

    console.log('yo soy el Middleware ', userFoundObj)

    // 6 - Creo las propiedades que almacenaran los datos que quiero pasar a la siguente funcion (que pueden ser: otro middleware o el controller)
    req.payload = userFoundObj;
    req.user = userFound;
    
    // 7 - La autorizacion para ejecutar la funcion (que pueden ser: otro middleware o el controller)
    next();
}

export default authoriztionUser