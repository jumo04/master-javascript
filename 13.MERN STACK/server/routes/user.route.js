const express = require("express");
const userRoute = express();
//importamos el controlador
const userController = require("../controllers/user.controller.js");

// creamos las rutas
userRoute.get("/mostrar", userController.getUsers);
userRoute.post("/create", userController.createUser);
userRoute.post("/ingresar", userController.loginUser);

module.exports = userRoute;

