const express = require('express');
const router = express.Router();
const {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/usuario.controller');

// Rutas para usuarios
router.get('/usuarios', getAllUsuarios);
router.get('/usuarios/:id', getUsuarioById);
router.post('/usuarios', createUsuario);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

module.exports = (app) => {
    app.use('/api', router);
};
