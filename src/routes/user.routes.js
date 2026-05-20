const express = require('express');
const { getUsers } = require('../controllers/users.controller');

const router = express.Router();

// Definicion de las rutas para lso usuarios
router.get('/',getUsers)

module.exports = router;