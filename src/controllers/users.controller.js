import usermodel from "../models/user.model.js"
import { insertUser } from "../services/user.services.js"

function getUsers(req, res) {
    res.json({
        msg: 'listar usuarios'
    })
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
            data: data

        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'no se registro el producto errorrrrr'
        })
    }
}

export { getUsers, deleteUser, updateUser, newUser };