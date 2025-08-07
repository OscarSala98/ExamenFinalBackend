const express = require('express');
const router = express.Router();
const {
    getAllCanchas,
    getCanchaById,
    createCancha,
    updateCancha,
    deleteCancha
} = require('../controllers/cancha.controller');

// Rutas para canchas
router.get('/canchas', getAllCanchas);
router.get('/canchas/:id', getCanchaById);
router.post('/canchas', createCancha);
router.put('/canchas/:id', updateCancha);
router.delete('/canchas/:id', deleteCancha);

module.exports = (app) => {
    app.use('/api', router);
};
