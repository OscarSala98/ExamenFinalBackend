# API de Reservas de Canchas

Sistema backend para gestionar reservas de canchas deportivas con usuarios, canchas y reservas.

## Estructura del Proyecto

```
ExamenFinal/
├── config/
│   └── sequelize.config.js
├── controllers/
│   ├── usuario.controller.js
│   ├── cancha.controller.js
│   └── reserva.controller.js
├── models/
│   ├── usuario.model.js
│   ├── cancha.model.js
│   ├── reserva.model.js
│   └── index.js
├── routes/
│   ├── usuario.routes.js
│   ├── cancha.routes.js
│   └── reserva.routes.js
├── server.js
└── package.json
```

## Modelos

### Usuario
- `id`: ID único (autoincremental)
- `nombre`: Nombre del usuario

### Cancha
- `id`: ID único (autoincremental)
- `nombre`: Nombre de la cancha

### Reserva
- `id`: ID único (autoincremental)
- `id_usuario`: ID del usuario que hace la reserva
- `id_cancha`: ID de la cancha reservada
- `fecha_hora`: Fecha y hora de la reserva

## Endpoints de la API

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener un usuario por ID
- `POST /api/usuarios` - Crear un nuevo usuario
- `PUT /api/usuarios/:id` - Actualizar un usuario
- `DELETE /api/usuarios/:id` - Eliminar un usuario

### Canchas
- `GET /api/canchas` - Obtener todas las canchas
- `GET /api/canchas/:id` - Obtener una cancha por ID
- `POST /api/canchas` - Crear una nueva cancha
- `PUT /api/canchas/:id` - Actualizar una cancha
- `DELETE /api/canchas/:id` - Eliminar una cancha

### Reservas
- `GET /api/reservas` - Obtener todas las reservas
- `GET /api/reservas/:id` - Obtener una reserva por ID
- `POST /api/reservas` - Crear una nueva reserva
- `PUT /api/reservas/:id` - Actualizar una reserva
- `DELETE /api/reservas/:id` - Eliminar una reserva
- `GET /api/usuarios/:id_usuario/reservas` - Obtener reservas por usuario
- `GET /api/canchas/:id_cancha/reservas` - Obtener reservas por cancha

## Instalación y Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar la base de datos MySQL en `config/sequelize.config.js`:
   - username: 'root'
   - password: 'oscar'
   - database: 'ReservasCanchas'
   - host: 'localhost'

3. Ejecutar el servidor:
```bash
npm start
# o para desarrollo
npm run dev
```

El servidor se ejecutará en `http://localhost:8000`

## Ejemplos de Uso

### Crear un usuario
```bash
POST /api/usuarios
{
  "nombre": "Juan Pérez"
}
```

### Crear una cancha
```bash
POST /api/canchas
{
  "nombre": "Cancha de Fútbol 1"
}
```

### Crear una reserva
```bash
POST /api/reservas
{
  "id_usuario": 1,
  "id_cancha": 1,
  "fecha_hora": "2025-08-10 15:00:00"
}
```

## Características

- Validación de disponibilidad de canchas
- Relaciones entre modelos con Sequelize
- Middleware CORS habilitado
- Manejo de errores
- Sincronización automática de base de datos
- Creación automática de la base de datos si no existe
