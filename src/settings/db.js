// src/settings/db.js
const { Sequelize } = require("sequelize");

// Asegúrate de tener instalado el paquete 'sequelize' y 'mysql2'
// npm install sequelize mysql2

const sequelize = new Sequelize('SENATI_BACKEND_DB', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // Especificamos que usamos MySQL
    logging: false, // Desactivar la impresión de SQL en consola
    define: {
        timestamps: false // Opción global para deshabilitar createdAt y updatedAt
    }
});

module.exports = sequelize;