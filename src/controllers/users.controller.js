import encrypedPassword from "../helpers/bcrypt.helper.js"
import usermodel from "../models/user.model.js"
import { dbdeleteUser, dbgetUsers, dbnewUser, dbupdateUser } from "../services/user.services.js"

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
        inputData.password = encrypedPassword(inputData.password)
        const data = await dbnewUser(inputData)

        res.json({
            msg: 'obtener nuevo usuario ',
            data: data

        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'no se registro el usuario errorrrrr'
        })
    }
}

export { getUsers, deleteUser, updateUser, newUser };