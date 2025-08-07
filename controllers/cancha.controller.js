const Cancha = require('../models/cancha.model');

// Obtener todas las canchas
const getAllCanchas = async (req, res) => {
    try {
        const canchas = await Cancha.findAll();
        res.status(200).json(canchas);
    } catch (error) {
        console.error('Error al obtener canchas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener una cancha por ID
const getCanchaById = async (req, res) => {
    try {
        const { id } = req.params;
        const cancha = await Cancha.findByPk(id);
        
        if (!cancha) {
            return res.status(404).json({ error: 'Cancha no encontrada' });
        }
        
        res.status(200).json(cancha);
    } catch (error) {
        console.error('Error al obtener cancha:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear una nueva cancha
const createCancha = async (req, res) => {
    try {
        const { nombre } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }
        
        const nuevaCancha = await Cancha.create({ nombre });
        res.status(201).json(nuevaCancha);
    } catch (error) {
        console.error('Error al crear cancha:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar una cancha
const updateCancha = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        
        const cancha = await Cancha.findByPk(id);
        
        if (!cancha) {
            return res.status(404).json({ error: 'Cancha no encontrada' });
        }
        
        await cancha.update({ nombre });
        res.status(200).json(cancha);
    } catch (error) {
        console.error('Error al actualizar cancha:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar una cancha
const deleteCancha = async (req, res) => {
    try {
        const { id } = req.params;
        
        const cancha = await Cancha.findByPk(id);
        
        if (!cancha) {
            return res.status(404).json({ error: 'Cancha no encontrada' });
        }
        
        await cancha.destroy();
        res.status(200).json({ mensaje: 'Cancha eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar cancha:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllCanchas,
    getCanchaById,
    createCancha,
    updateCancha,
    deleteCancha
};
