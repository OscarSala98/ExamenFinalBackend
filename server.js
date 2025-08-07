const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

// Conexión a la base de datos
const { sequelize, createDatabaseIfNotExists } = require('./config/sequelize.config');

// Importar los modelos y sus relaciones
require('./models/index');

app.use(cors()); // Middleware para permitir CORS
app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear URL-encoded

// Importar y registrar las rutas
const allUsuarioRoutes = require('./routes/usuario.routes');
allUsuarioRoutes(app);

const allCanchaRoutes = require('./routes/cancha.routes');
allCanchaRoutes(app);

const allReservaRoutes = require('./routes/reserva.routes');
allReservaRoutes(app);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'API de Reservas de Canchas',
        version: '1.0.0',
        endpoints: {
            usuarios: '/api/usuarios',
            canchas: '/api/canchas',
            reservas: '/api/reservas'
        }
    });
});

// Sincronizar la base de datos y iniciar el servidor
const startServer = async () => {
    try {
        // Primero crear la base de datos si no existe
        await createDatabaseIfNotExists();
        
        // Luego sincronizar los modelos
        await sequelize.sync();
        console.log('✅ Base de datos sincronizada');
        
        app.listen(port, function() {
            console.log(`🚀 Servidor corriendo en el puerto ${port}`);
            console.log(`📍 URL: http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌Error al sincronizar la BDD:', error);
        process.exit(1);
    }
};

startServer();