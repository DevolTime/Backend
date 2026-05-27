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

function newUser (req, res) {
    res.json({
        msg: 'nuevo user'
    })
}

export { getUsers, deleteUser, updateUser, newUser };