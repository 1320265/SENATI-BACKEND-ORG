// CONFIGURACION BASE
const express = require('express');
const app = express();
const port = 3000;

// USANDO LAS VARIABLES DE CONFIGURACION

app.use(express.json());

// DATOS QUE DESEO EXPONER POR EL API / ENDPOINT
const users = [
    {id: 1, username: "senati1"},
    {id: 2, username: "senati2"},
    {id: 3, username: "senati3"},
]

app.get('/users/', (req, res) => {
    // res.send("API funcionando SENATI");
    res.json(users);
})

// CREANDO DATOS CON POST
app.post('/users/new/', (req, res) => {
    const new_user = {
        id: users.length + 1,
        username: req.body.username
    };

    users.push(new_user);
    res.status(201).json(new_user);
})

// ACTUALIZANDO DATOS CON PUT
app.put('/users/:id', (req, res) => {
    const id_edit = parseInt(req.params.id);
    const user_edit = users.find(u => u.id == id_edit);

    if (!user_edit) {
        return res.status(404).json({ mensaje: "user no encontrado"});
    };

    user_edit.username = req.body.username || user_edit.username;
    res.json(user_edit);

})

// BORRANDO DATOS CON DELETE
app.delete('/users/:id', (req, res) => {
    const id_delete = parseInt(req.params.id);
    const user_delete =  users.findIndex(u => u.id === id_delete);

    if (!user_delete || user_delete === -1) {
        return res.status(404).json({ mensaje: "user no encontrado y no es posible eliminar"});
    }

    users.slice(user_delete, 1);
    res.status(204).send();
})




//INCIALIZANDO SERVIDOR EXPRESS

app.listen(port, () => {
    console.log("inciando servidor express");
})


// GET POST PUT DELETE