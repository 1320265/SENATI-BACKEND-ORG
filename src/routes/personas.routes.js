// src/models/personas.js
const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Personas = sequelize.define(
    "persona",
    {
        nombres: {type: DataTypes.STRING(100), allowNull: false},
        apellidos: {type: DataTypes.STRING(100), allowNull: false},
        dni: {type: DataTypes.STRING(20), allowNull: false, unique: true},
        fecha_nac: {type: DataTypes.DATEONLY} 
    },
    {
        tableName: "personas",
        timestamps: false
    }
);

module.exports = Personas;