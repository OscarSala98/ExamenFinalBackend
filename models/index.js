// models/index.js
const Usuario = require('./usuario.model');
const Cancha = require('./cancha.model');
const Reserva = require('./reserva.model');

// Definir relaciones
Usuario.hasMany(Reserva, { foreignKey: 'id_usuario' });
Cancha.hasMany(Reserva, { foreignKey: 'id_cancha' });

Reserva.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Reserva.belongsTo(Cancha, { foreignKey: 'id_cancha' });

module.exports = {
    Usuario,
    Cancha,
    Reserva
};
