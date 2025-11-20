// src/routes/personas.routes.js
const express = require("express");
const controller = require("../controllers/personas.controller");
const router = express.Router();

router.get("/personas/", controller.listPersonas);
router.post("/personas/new/", controller.createPersona); // Usaremos /new/ por consistencia con tu userController.js
router.put("/personas/:id", controller.updatePersona);
router.delete("/personas/:id", controller.destroyPersona);

module.exports = router;