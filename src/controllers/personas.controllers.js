// src/controllers/personas.controller.js
const Personas = require("../models/personas");

// Función auxiliar para convertir el formato de fecha DD/MM/YYYY a YYYY-MM-DD
function convertDateFormat(dateString) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`; 
    }
    return dateString;
}

module.exports = {
    // GET /personas/
    async listPersonas(req, res) {
        try {
            const personas = await Personas.findAll();
            res.json(personas);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al listar personas", error: error.message });
        }
    },
    
    // POST /personas/new/
    async createPersona(req, res) {
        const { nombres, apellidos, dni, fecha_nac } = req.body;
        const fechaNacimientoDB = fecha_nac ? convertDateFormat(fecha_nac) : null; 

        try {
            const nuevaPersona = await Personas.create({ 
                nombres, 
                apellidos, 
                dni, 
                fecha_nac: fechaNacimientoDB 
            });
            res.status(201).json(nuevaPersona);
        } catch (error) {
            res.status(400).json({ mensaje: "Error al crear persona. (DNI duplicado o datos faltantes).", error: error.message });
        }
    },

    // PUT /personas/:id
    async updatePersona(req, res) {
        const { id } = req.params;
        const { nombres, apellidos, dni, fecha_nac } = req.body;
        
        const updateData = {};
        if (nombres) updateData.nombres = nombres;
        if (apellidos) updateData.apellidos = apellidos;
        if (dni) updateData.dni = dni;
        if (fecha_nac) updateData.fecha_nac = convertDateFormat(fecha_nac); 

        const [rowsAffected] = await Personas.update(updateData, { where: { id }});
        
        if (rowsAffected === 0) {
            return res.status(404).json({ mensaje: "Persona no encontrada o no hubo cambios."});
        }
        res.json({ mensaje: "Persona actualizada exitosamente"});
    },

    // DELETE /personas/:id
    async destroyPersona(req, res) {
        const { id } = req.params;
        const rowsAffected = await Personas.destroy({ where: { id }});
        
        if (rowsAffected === 0) {
            return res.status(404).json({ mensaje: "Persona no encontrada."});
        }
        res.json({ mensaje: "Persona eliminada exitosamente"});
    },
};