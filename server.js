// server.js (RAÍZ DEL PROYECTO)

// --- LIBRERÍAS Y CONEXIÓN ---
const express = require('express');
const sequelize = require('./src/settings/db'); // Carga la conexión
const app = express();
const PORT = 3000;

// --- MODELOS (Asegura que Sequelize los cargue para sync) ---
const User = require('./src/models/user'); 
const Personas = require('./src/models/personas');

// --- ROUTERS (Rutas) ---
const UserRouter = require('./src/routes/user.routes');
const PersonasRouter = require('./src/routes/personas.routes');


// --- MIDDLEWARES ---
app.use(express.json());

// --- MONTAJE DE ROUTERS ---
app.use(UserRouter);
app.use(PersonasRouter);


// --- FUNCIÓN DE ARRANQUE ---
async function startServer() {
    try {
        // Sincroniza los modelos con la base de datos (crea las tablas si no existen)
        await sequelize.sync(); 
        console.log('✅ Base de datos sincronizada. Tablas creadas/verificadas.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor Express ejecutándose en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Error al iniciar el servidor o conectar a la BD:', err);
    }
}

// Ejecuta la función de arranque
startServer();