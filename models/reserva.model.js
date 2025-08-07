const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize.config');
const Usuario = require('./usuario.model');
const Cancha = require('./cancha.model');

const Reserva = sequelize.define('Reserva', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    id_cancha: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cancha,
            key: 'id'
        }
    },
    fecha_hora: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'reservas',
    timestamps: false
});

Reserva.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Reserva.belongsTo(Cancha, { foreignKey: 'id_cancha' });

module.exports = Reserva;
