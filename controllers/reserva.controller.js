const Reserva = require('../models/reserva.model');
const Usuario = require('../models/usuario.model');
const Cancha = require('../models/cancha.model');

// Obtener todas las reservas
const getAllReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            include: [
                { model: Usuario, attributes: ['id', 'nombre'] },
                { model: Cancha, attributes: ['id', 'nombre'] }
            ]
        });
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener una reserva por ID
const getReservaById = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findByPk(id, {
            include: [
                { model: Usuario, attributes: ['id', 'nombre'] },
                { model: Cancha, attributes: ['id', 'nombre'] }
            ]
        });
        
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        
        res.status(200).json(reserva);
    } catch (error) {
        console.error('Error al obtener reserva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear una nueva reserva
const createReserva = async (req, res) => {
    try {
        const { id_usuario, id_cancha, fecha_hora } = req.body;
        
        if (!id_usuario || !id_cancha || !fecha_hora) {
            return res.status(400).json({ 
                error: 'Los campos id_usuario, id_cancha y fecha_hora son requeridos' 
            });
        }
        
        // Verificar que el usuario existe
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        // Verificar que la cancha existe
        const cancha = await Cancha.findByPk(id_cancha);
        if (!cancha) {
            return res.status(404).json({ error: 'Cancha no encontrada' });
        }
        
        // Verificar que no haya una reserva para la misma cancha en la misma fecha y hora
        const reservaExistente = await Reserva.findOne({
            where: {
                id_cancha,
                fecha_hora
            }
        });
        
        if (reservaExistente) {
            return res.status(400).json({ 
                error: 'Ya existe una reserva para esta cancha en esa fecha y hora' 
            });
        }
        
        const nuevaReserva = await Reserva.create({ id_usuario, id_cancha, fecha_hora });
        
        // Obtener la reserva creada con los datos relacionados
        const reservaCompleta = await Reserva.findByPk(nuevaReserva.id, {
            include: [
                { model: Usuario, attributes: ['id', 'nombre'] },
                { model: Cancha, attributes: ['id', 'nombre'] }
            ]
        });
        
        res.status(201).json(reservaCompleta);
    } catch (error) {
        console.error('Error al crear reserva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar una reserva
const updateReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario, id_cancha, fecha_hora } = req.body;
        
        const reserva = await Reserva.findByPk(id);
        
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        
        // Si se está actualizando la cancha o fecha_hora, verificar disponibilidad
        if (id_cancha || fecha_hora) {
            const nuevaCancha = id_cancha || reserva.id_cancha;
            const nuevaFechaHora = fecha_hora || reserva.fecha_hora;
            
            const reservaExistente = await Reserva.findOne({
                where: {
                    id_cancha: nuevaCancha,
                    fecha_hora: nuevaFechaHora,
                    id: { [require('sequelize').Op.ne]: id } // Excluir la reserva actual
                }
            });
            
            if (reservaExistente) {
                return res.status(400).json({ 
                    error: 'Ya existe una reserva para esta cancha en esa fecha y hora' 
                });
            }
        }
        
        await reserva.update({ id_usuario, id_cancha, fecha_hora });
        
        // Obtener la reserva actualizada con los datos relacionados
        const reservaActualizada = await Reserva.findByPk(id, {
            include: [
                { model: Usuario, attributes: ['id', 'nombre'] },
                { model: Cancha, attributes: ['id', 'nombre'] }
            ]
        });
        
        res.status(200).json(reservaActualizada);
    } catch (error) {
        console.error('Error al actualizar reserva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar una reserva
const deleteReserva = async (req, res) => {
    try {
        const { id } = req.params;
        
        const reserva = await Reserva.findByPk(id);
        
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        
        await reserva.destroy();
        res.status(200).json({ mensaje: 'Reserva eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar reserva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener reservas por usuario
const getReservasByUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        
        const reservas = await Reserva.findAll({
            where: { id_usuario },
            include: [
                { model: Usuario, attributes: ['id', 'nombre'] },
                { model: Cancha, attributes: ['id', 'nombre'] }
            ]
        });
        
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al obtener reservas del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener reservas por cancha
const getReservasByCancha = async (req, res) => {
    try {
        const { id_cancha } = req.params;
        
        const reservas = await Reserva.findAll({
            where: { id_cancha },
            include: [
                { model: Usuario, attributes: ['id', 'nombre'] },
                { model: Cancha, attributes: ['id', 'nombre'] }
            ]
        });
        
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al obtener reservas de la cancha:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllReservas,
    getReservaById,
    createReserva,
    updateReserva,
    deleteReserva,
    getReservasByUsuario,
    getReservasByCancha
};
