const express = require("express");
const slideRoute = express();
//importamos el controlador
const sliderController = require("../controllers/slide.controller.js");

const { verificarToken } = require('../middlewares/auth');

// creamos las rutas
slideRoute.get("/mostrar", sliderController.getSlide);
slideRoute.post("/create", verificarToken, sliderController.createSlide);
slideRoute.put("/actualizar/:id", verificarToken, sliderController.updateSlide);
slideRoute.delete("/eliminar/:id", verificarToken, sliderController.deleteSlide);
slideRoute.get("/mostrar/:imagen", sliderController.showImg);

module.exports = slideRoute;

