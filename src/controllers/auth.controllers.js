import { validatePassword } from "../bcrypt.helper/bcrypt.helper.js";
import { generateToken } from "../bcrypt.helper/jwt.helper.js";
import { dbGetUserByEmail } from "../services/user.services.js";

const loginUser = async (req, res) => {
    try {
        // 1- Extraer datos
        const inputData = req.body;

        if (!inputData.password) {
            throw new Error('Se olvidó pasar la propiedad password en el login');
        }

        // 2- Verificacion de usuario
        const userFoud = await dbGetUserByEmail(inputData.email)
        if (!userFoud) { throw new Error('El usuario no existe, por favor registrese') };

        // 3 Verificar la contraseña
        const isValid = validatePassword(inputData.password, userFoud.password)

        if (!isValid) { throw new Error('Sus credenciales no son validas') };

        // 4 Generar Tokens
        const payload = {
            _id: userFoud._id,
            name: userFoud.name,
            email: userFoud.email,
            role: userFoud.role
        };
        const token = generateToken(payload);

        if (token === null) {
            throw new Error('No se pudo generar el token de acceso');
        }


        // 5 Convertir un NJSON en JSON para eliminar la propiedad password
        const userFoundObj = userFoud.toObject();
        delete userFoundObj.password;

        // Paso 6: Responde al cliente enviandole el token
        res.json({
            msg: 'Login exitoso',
            token: token,
            data: userFoundObj
        })
    } catch (error) {
        console.error(error);

        // A. Controlar errores de validación de campos del Login (Negocio)
        if (
            error.message.includes('Se olvidó pasar') ||
            error.message.includes('El usuario no existe') ||
            error.message.includes('Sus credenciales no son validas')
        ) {
            return res.status(400).json({
                msg: error.message
            });
        }

        // B. Controlar error al generar el token (Internal Server Error)
        if (error.message.includes('No se pudo generar el token de acceso')) {
            return res.status(500).json({
                msg: error.message
            });
        }

        // C. Error general interno del servidor (p. ej. error en la base de datos o de sintaxis)
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor durante el login'
        });
    }
}

const reNewToken = async (req, res) => {
    // 1 - Obtener los datos del usuario y carga util del Middleware
    const payload = req.payload;
    const user = req.user;

    // 2 - Verificar que el usuario al que se va a renovar el token existe y este activo
    const userFound = await dbGetUserByEmail(payload.email);

    if (!userFound) {
        return res.status(400).json({
            msg: 'No se pudo renovar el token por que el usuario ha sido eliminado o esta inactivo'
        })
    }

    // 3 - Generar un nuevo token a partir de los datos registrados en la base de datos 
    const newPayload = {
        _id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        role: userFound.role
    }

    // Creacion del nuevo token
    const token = generateToken(newPayload);

    // 4 - Eliminar las propiedades sensibles como el password
    const userFoundObj = userFound.toObject();
    delete userFoundObj.createdAt
    delete userFoundObj.password
    delete userFoundObj.updatedAt

    // 5 - Responde al cliente con el nuevo token y los datos del usuario
    res.json({
        msg: 'token nuevo',
        token,
        data: userFoundObj
    })
}

export { loginUser, reNewToken }