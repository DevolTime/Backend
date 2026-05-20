const express = require('express');

const router = express.Router();

// Definicion de las rutas para lso usuarios
router.get('/', (req, res) =>{
    res.json({
        msg: 'listar usuarios'
    })
})

module.exports = router;