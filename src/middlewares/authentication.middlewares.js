import { hash } from "bcrypt"
import { json } from "express"
import { verifyToken } from "../helpers/jwt.helper.js"
import { dbGetUserByEmail } from "../services/user.services.js"

const authenticationUser = async (req, res, next) => {

    //paso1 obtengo la cadena que contiene "el token"
    const token = req.header('X-Token')
    if (!token) {
        return res.status(401).json({
            msg: 'cadena de token vacia'
        })
    }

    //paso verificar el formato del token 

    const tokenParts = token.split('.');

    if (tokenParts.length !== 3) {
        return res.status(400).json({
            msg: 'formato de token no cumple con 3'
        })
    }
    //paso 3 verificar la utenticidad del toke y extraer el payload
    const payload = verifyToken(token)
    if (!payload) {
        return res.status(400).json({
            msg: 'token invalido '
        })
    }

    // paso 4 verificar si el usuario dentro de plalond del token exiarw 
    const userFound = await dbGetUserByEmail(payload.email)

    //verificar si el usuario exite o esta inhabilitadod  
    if (!userFound) {
        return res.status(400).json({
            msg: 'no se posible generar el token '
        })
    }

    //paso 5 eliminarlas propiedades inecesarios para crear el payload para el nuevo 
    const userFoundObj = userFound.toObject()
    delete userFoundObj.password
    delete userFoundObj.createdAt
    delete userFoundObj.updateAt
    delete userFoundObj.avatar

    console.log('yo soy widdleware', userFoundObj)

    //paso 6 creo las propiedades que almaceneran los datos que quiero pasar a la sigueinte funcion (que pueden ser otro middleware o el controller )

    req.payload = userFoundObj
    req.user = userFound

    //paso 7 la autorizacion para ejecutar la funcion la funcion 

    next();
}


export default authenticationUser