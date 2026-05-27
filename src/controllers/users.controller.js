import usermodel from "../models/user.model.js"
import { dbgetUsers, insertUser } from "../services/user.services.js"

const  getUsers= async (req, res) =>{
    try { 
         const data= await dbgetUsers()
    res.json({
        msg: 'listar usuarios',
        data : data
    })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'no se Obtener infromacion de los usuarios'
        });
    }

}
function deleteUser(req, res) {
    res.json({
        msg: 'elimina un usuario'
    })
}

function updateUser(req, res) {
    res.json({
        msg: 'actualiza un usuario'
    })
}

const newUser = async (req, res) => {
    try {
        const inputData = req.body
        const data = await insertUser(inputData)

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