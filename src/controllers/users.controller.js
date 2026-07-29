
import { ROLES } from "../config/global.config.js"
import { encryptedPassword } from "../bcrypt.helper/bcrypt.helper.js"
import usermodel from "../models/user.model.js"
import { dbdeleteUser, dbGetUserById, dbgetUsers, dbnewUser, dbupdateUser } from "../services/user.services.js"

const getUsers = async (req, res) => {
    try {
        const data = await dbgetUsers()
        res.json({
            msg: 'listar usuarios',
            data: data
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'no se Obtener infromacion de los usuarios'
        });
    }
}
const getUserById =async( req,res)=>{


  try {
    const id = req.params.id;

        const data = await dbGetUserById(id)
        res.json({
            msg: 'listar usuarios',
            data: data
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'no se obtiene infromacion de los usuarios'
        });
    }

}


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await dbdeleteUser(id);

        res.json({
            msg: 'elimina un usuario',
            data: data
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'no se pudo eliminar el usuario'
        });

    }

}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id  // obtiene el id que sesea hacerel la modidicacion
        const inputData = req.body; // onteniendo el objetivoc con el /los parametros que quiero actulaizar 
        const data = await dbupdateUser(id, inputData)

        res.json({
            msg: 'actualiza un usuario',
            data: data
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'no se puedo actualziar el usuario errorrrr el usuario errorrrrr'
        })
    }

}


const newUser = async (req, res) => {
    try {
        const inputData = req.body

        inputData.password = encryptedPassword(inputData.password);
        const data = await dbnewUser(inputData)
      
            res.status(201).json({
            data: data
        })

    } catch (error) {
        // A. Capturar error lanzado: Propiedad password omitida
        if (error.message.includes('Se olvidó pasar la propiedad password')) {
            return res.status(400).json({
                msg: error.message
            });
        }

        // B. Controlar errores de validación de campos de Mongoose (Reglas del Schema)
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);

            return res.status(400).json({
                msg: 'Error de validación en los datos del usuario',
                errors: messages
            });
        }

        // C. Controlar errores de índices únicos de MongoDB (Código 11000)
        if (error.code === 11000) {
            const duplicatedField = Object.keys(error.keyValue)[0];

            const errorMessages = {
                email: 'El correo electrónico ya se encuentra registrado por otro usuario',
            };

            return res.status(400).json({
                msg: errorMessages[duplicatedField] || 'Ya existe un registro con algunos de estos valores únicos'
            });
        }

        // D. Error general interno del servidor
        res.status(500).json({
            msg: 'No se pudo registrar el usuario'
        });
    }
}


export { getUsers, deleteUser, updateUser, newUser, getUserById};