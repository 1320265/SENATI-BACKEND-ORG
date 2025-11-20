// server.js

// --- LIBRERÍAS ---
const express = require('express');
const sequelize = require('./src/settings/db'); // 1. Conexión de Sequelize

// --- MODELOS (Importar para que Sequelize los conozca) ---
// Aunque no los uses directamente aquí, el require asegura que se carguen en la instancia de Sequelize.
const User = require('./src/models/user'); 
const Personas = require('./src/models/personas');

// --- ROUTERS (Rutas) ---
const UserRouter = require('./src/routes/user.routes');
const PersonasRouter = require('./src/routes/personas.routes');

// --- CONFIGURACIÓN PRINCIPAL ---
const app = express();
const PORT = 3000;

// --- MIDDLEWARES ---
// Permite que Express lea cuerpos de petición en formato JSON
app.use(express.json());

// --- RUTA DE BIENVENIDA ---
app.get('/', (req, res) => {
    res.json({
        message: 'API SENATI-BACKEND V1.0 - Sequelize y MVC',
        status: 'Online',
        endpoints: ['/users', '/personas']
    });
});

// --- MONTAJE DE ROUTERS (Rutas) ---
// Todas las rutas definidas en user.routes.js comienzan a funcionar aquí
app.use(UserRouter);
// Todas las rutas definidas en personas.routes.js comienzan a funcionar aquí
app.use(PersonasRouter);


// --- FUNCIÓN DE ARRANQUE ---
// Esta función asíncrona inicia la conexión a la base de datos y luego el servidor Express.
async function startServer() {
    try {
        // 1. Sincroniza los modelos con la base de datos
        // Crea las tablas 'users' y 'personas' si no existen (gracias a sequelize.sync())
        await sequelize.sync(); 
        console.log('✅ Base de datos sincronizada. Tablas creadas/verificadas.');

        // 2. Inicia el servidor Express
        app.listen(PORT, () => {
            console.log(`🚀 Servidor Express ejecutándose en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Error al iniciar el servidor o conectar a la BD:', err);
    }
}

// Ejecuta la función de arranque
startServer();