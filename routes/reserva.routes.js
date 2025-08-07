const express = require('express');
const router = express.Router();
const {
    getAllReservas,
    getReservaById,
    createReserva,
    updateReserva,
    deleteReserva,
    getReservasByUsuario,
    getReservasByCancha
} = require('../controllers/reserva.controller');

// Rutas para reservas
router.get('/reservas', getAllReservas);
router.get('/reservas/:id', getReservaById);
router.post('/reservas', createReserva);
router.put('/reservas/:id', updateReserva);
router.delete('/reservas/:id', deleteReserva);

// Rutas adicionales para filtrar reservas
router.get('/usuarios/:id_usuario/reservas', getReservasByUsuario);
router.get('/canchas/:id_cancha/reservas', getReservasByCancha);

module.exports = (app) => {
    app.use('/api', router);
};
