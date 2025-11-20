// src/models/personas.js (Usando Sequelize)
const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db"); // La conexión a Sequelize

const Personas = sequelize.define(
    "persona",
    {
        nombres: {type: DataTypes.STRING(100), allowNull: false},
        apellidos: {type: DataTypes.STRING(100), allowNull: false},
        dni: {type: DataTypes.STRING(20), allowNull: false, unique: true},
        // Sequelize usa DATEONLY para solo guardar la fecha (YYYY-MM-DD)
        fecha_nac: {type: DataTypes.DATEONLY} 
    },
    {
        tableName: "personas", // Aseguramos que el nombre de la tabla en MySQL sea 'personas'
        timestamps: false
    }
);

module.exports = Personas;