// src/app.js
const express = require("express");
const sequelize = require("./settings/db");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(express.json());

app.use("/u", userRoutes);

sequelize.authenticate()
    .then(() => console.log("Conectando a la DB"))
    .catch(err => console.error("Error ", err));

module.exports = app;