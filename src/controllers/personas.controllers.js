// src/controllers/personas.controller.js
const Personas = require("../models/personas"); // Importa el modelo Personas

// Lógica de validación para el formato de fecha (MM/DD/YYYY o DD/MM/YYYY)
// Sequelize prefiere YYYY-MM-DD, así que validaremos el formato de entrada
function convertDateFormat(dateString) {
    // Intenta parsear el formato DD/MM/YYYY (común en Latinoamérica)
    const parts = dateString.split('/');
    if (parts.length === 3) {
        // Devuelve YYYY-MM-DD
        return `${parts[2]}-${parts[1]}-${parts[0]}`; 
    }
    // Si no es el formato esperado, devuelve el string original o null para error
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
        
        // Convertimos el formato de fecha "12/12/2000" a "2000-12-12"
        const fechaNacimientoDB = convertDateFormat(fecha_nac); 

        try {
            const nuevaPersona = await Personas.create({ 
                nombres, 
                apellidos, 
                dni, 
                fecha_nac: fechaNacimientoDB // Usamos el formato para DB
            });
            res.status(201).json(nuevaPersona);
        } catch (error) {
             // 400 Bad Request si falta un campo requerido o hay error de DNI duplicado
            res.status(400).json({ mensaje: "Error al crear persona. DNI podría estar duplicado o formato de fecha incorrecto.", error: error.message });
        }
    },

    // PUT /personas/:id
    async updatePersona(req, res) {
        const { id } = req.params;
        const { nombres, apellidos, dni, fecha_nac } = req.body;
        
        // Preparamos los datos a actualizar
        const updateData = {};
        if (nombres) updateData.nombres = nombres;
        if (apellidos) updateData.apellidos = apellidos;
        if (dni) updateData.dni = dni;
        // Solo convertimos la fecha si viene en el cuerpo de la petición
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
            return res.status(404).json({ mensaje: "Persona no encontrada y no fue posible eliminar."});
        }
        res.json({ mensaje: "Persona eliminada exitosamente"});
    },
};