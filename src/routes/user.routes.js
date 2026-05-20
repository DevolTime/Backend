const express = require('express');
const { getUsers, deleteUser, updateUser, newUser} = require('../controllers/users.controller');

const router = express.Router();

// Definicion de las rutas para lso usuarios
router.get('/',getUsers)

router.delete('/', deleteUser)

router.patch('/', updateUser)

router.post('/', newUser)

module.exports = router;