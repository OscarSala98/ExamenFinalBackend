const { Sequelize } = require('sequelize');

const username = 'root';
const password = 'oscar';
const bdd_name = 'ReservasCanchas';
const hostName = 'localhost';

// Conectar a la base de datos específica
const sequelize = new Sequelize(bdd_name, username, password, {
    host: hostName,
    dialect: 'mysql'
});

// Función para crear la base de datos si no existe
const createDatabaseIfNotExists = async () => {
    try {
        // Conexión inicial sin especificar la base de datos
        const initialSequelize = new Sequelize(`mysql://${username}:${password}@localhost`);
        
        await initialSequelize.query(`CREATE DATABASE IF NOT EXISTS ${bdd_name};`);
        console.log('✅ BDD creada o ya existía');
        
        await initialSequelize.close();
        
    } catch (error) {
        console.error('❌Error al crear la BDD:', error);
        throw error;
    }
};

module.exports = { sequelize, createDatabaseIfNotExists };