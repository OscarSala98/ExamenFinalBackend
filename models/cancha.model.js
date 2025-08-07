const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize.config');

const Cancha = sequelize.define('Cancha', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            notNull: {
                msg: 'El ID es requerido'
            }
        }   
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre es requerido'
            }
        }
    }
}, {
    tableName: 'canchas',
    timestamps: false
});

module.exports = Cancha;
