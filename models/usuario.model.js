const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize.config');

const Usuario = sequelize.define('Usuario', {
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
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;
