const express = require("express");
const adminRoute = express();
//importamos el controlador
const adminController = require("../controllers/admin.controller.js");

const { verificarToken } = require('../middlewares/auth');

// creamos las rutas
adminRoute.get("/mostrar", verificarToken, adminController.getAdmins);
adminRoute.post("/create", verificarToken, adminController.createAdmin);
adminRoute.put("/actualizar/:id", verificarToken, adminController.updateAdmin);
adminRoute.delete("/eliminar/:id",  verificarToken, adminController.deleteAdmin);
adminRoute.post("/ingresar", adminController.login);

module.exports = adminRoute;

