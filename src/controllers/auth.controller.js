

import { validatePassword } from "../helpers/bcrypt.helper.js"
import { dbGetUserByEmail } from "../services/user.services.js"
import { generaToken } from "../helpers/jwt.helper.js"

const loginUser = async (req, res) => {
    const inputData = req.body // paso 1 extraer los datos que se ingresan 

    // paso 2 verifica si el usaurio esta registrado 
    const userFound = await dbGetUserByEmail(inputData.email)

    if (!userFound)
        return res.status(400).json({
            msg: 'usuario no exite ingreselo again'
        })
    // paso 3 verificar si la contrasñea es valida 
    const idValid = validatePassword(inputData.password, userFound.password)

    if (!idValid) {
        return res.status(400).json({
            msg: 'suscredenciales son erroneas '
        })
    }
    // paso 4 generar el token 
    // funcionalidad que genra el token
    const payload = {
        _id: userFound._id,
        name : userFound.name,
        email: userFound.email,
        status: userFound.status,
    }

const token = generaToken(payload)


//paso 5 convertir un bjson a jsn para eliminar propiedades
const userFoundObj = userFound.toObject();
delete userFoundObj.password;


 //paso 6 responde al cleinte enviando el token 
    res.json({
        msg: 'Login Exitoso',
        token,
        data: userFoundObj
    })

}
export {
    loginUser
}