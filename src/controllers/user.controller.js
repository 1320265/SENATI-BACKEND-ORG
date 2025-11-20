// src/controllers/user.controller.js
const User = require("../models/user");

// CRUD USERS
module.exports = {
    async listUsers(req, res) {
        const users = await User.findAll({ attributes: ['id', 'username'] });
        res.json(users); 
    },
    async createUser(req, res) {
        const { username, password } = req.body;
        try {
            const user_new = await User.create({ username, password});
            res.status(201).json(user_new);
        } catch (error) {
            res.status(400).json({ mensaje: "Error al crear usuario", error: error.message });
        }
    },
    async updateUser(req, res) {
        const { id } = req.params;
        const { username, password } = req.body;
        const [rowsAffected] = await User.update({ username, password }, { where: { id }});
        if (rowsAffected === 0) return res.status(404).json({ mensaje: "User no encontrado"});
        res.json({ mensaje: "User actualizado"});
    },
    async destroidUser(req, res) {
        const { id } = req.params;
        const rowsAffected = await User.destroy({ where: { id }});
        if (rowsAffected === 0) return res.status(404).json({ mensaje: "User no encontrado"});
        res.json({ mensaje: "User eliminado"});
    },
};