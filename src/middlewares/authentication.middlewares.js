import { hash } from "bcrypt"
import { json } from "express"
import { verifyToken } from "../helpers/jwt.helper.js"

const authenticationUser =( req,res, next)=>{

    //paso1 obtengo la cadena que contiene "el token"
    const token =req.header('X-Token')
if (!token) {
   return res.status(401).json({
        msg : 'cadena de token vacia'
    })
}
 
//paso verificar el formato del token 

const tokenParts =token.split('.');

if(tokenParts.length!== 3){
    return res.status(400).json({
        msg :'formato de token no cumple con 3'
    })
}
//paso 3 verificar la utenticidad del toke y extraer el playload
 const playload = verifyToken(token)



console.log(playload,token)
next()
}


export default authenticationUser