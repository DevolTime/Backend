import { dbGetUserByEmail } from "../services/user.services.js"

const loginUser = async (req, res) => {
    const inputData = req.body // extraer los datos que se ingresan 

    // paso 2 verifica si el usaurio esta registrado 
    const userFound = await dbGetUserByEmail(inputData.email)

    if (!userFound)
        return res.status(400).json({
            msg: 'usuario no exite ingreselo again'
        })


    res.json({
        msg: 'login de usuario'
    })

}
export {
    loginUser
}