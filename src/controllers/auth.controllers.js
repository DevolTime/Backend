import { dbGetUserByEmail } from "../services/user.services.js";

const loginUser = async (req, res) => {
    // 1- Extraer datos
    const inputData = req.body;

    // 2- Verificacion de usuario

    const userFoud = await dbGetUserByEmail(inputData.email)
    if (! userFoud) {
        return res.status(400).json({
            msg: 'El usuario no existe, Por favor Registrese'
        })
    };

    // 3 Verificar la contraseña

    res.status(201).json({
        msg: 'funca'
    })
}

export { loginUser }