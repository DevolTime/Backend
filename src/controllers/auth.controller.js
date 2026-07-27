

import { validatePassword } from "../helpers/bcrypt.helper.js"
import { dbGetUserByEmail } from "../services/user.services.js"
import { generateToken } from "../helpers/jwt.helper.js"



const loginUser = async (req, res) => {
    try {
        const inputData = req.body // paso 1 extraer los datos que se ingresan 
        if (!inputData.password) {
            throw new Error('se olviso pasar la propiedad password en el login ')

        }

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
            name: userFound.name,
            email: userFound.email,
            status: userFound.status,
            avatar: userFound.avatar,
            role: userFound.role
        }

        const token = generateToken(payload)


        //paso 5 convertir un bjson a jsn para eliminar propiedades
        const userFoundObj = userFound.toObject();
        delete userFoundObj.password;


        //paso 6 responde al cleinte enviando el token 
        res.json({
            msg: 'Login Exitoso',
            token,
            data: userFoundObj
        })

    } catch (error) {
        console.error(error)
        if (error.message.includes('se me olvido pasar') ||
            error.message.includes('el usuario no exite ') ||
            error.message.includes('las credenciales no son validas')
        ) { return res.status(400).json({ msg: error.message }); }

        if (error.message.includes('no se puedo generar el token de acceso')) {
            return res.status(500).json({
                msg: error.message
            })
            res.status(500).json({
                msg: 'ocurrio un error en el servidor durante el login'
            })
        }
    }

}

//obtener los datos del usuarioy la carga util del minddelware

const reNewToken = async (req, res) => {
    //obtener los datos del usuarioy la carga util del minddelware

    const payload = req.payload
    const user = req.user
    //usuario que se va a generar el nuevo token existe o esta activo 
    const userFound = await dbGetUserByEmail(payload.email)

    if (!userFound) {
        return res.status(400).json({
            msg: 'no se renueva el token para el usuario eliminado'
        })
    }
    //paso tres generar un nuevo toekn a partir de los datos registrados

    const newPayload = {
        _id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        status: userFound.status,
        avatar: userFound.avatar
    }
    //creacion nuevo token 

    const token = generateToken(newPayload)
    //eliminar propiedades sensibles

    const userFoundObj = userFound.toObject()
    delete userFoundObj.password;
    delete userFoundObj.createdAt;
    delete userFoundObj.updatedAt;

    res.json({
        msg: 'aqui se renueva el token',
        token,
        data: userFoundObj
    })
}

export { loginUser, reNewToken }