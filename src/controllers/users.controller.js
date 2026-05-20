function getUsers(req, res) {
    res.json({
        msg: 'listar usuarios'
    })
}

module.exports = {getUsers}