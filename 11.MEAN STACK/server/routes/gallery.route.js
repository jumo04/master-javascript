const express = require("express");
const galleryRoute = express();
//importamos el controlador
const galleryController = require("../controllers/gallery.controller.js");

const { verificarToken } = require('../middlewares/auth');

// creamos las rutas
galleryRoute.get("/mostrar", galleryController.getGallery);
galleryRoute.post("/create", verificarToken, galleryController.createGallery);
galleryRoute.put("/actualizar/:id",  verificarToken, galleryController.updateGallery);
galleryRoute.delete("/eliminar/:id", verificarToken, galleryController.deleteGallery);
galleryRoute.get("/mostrar/:imagen", galleryController.getImg);

module.exports = galleryRoute;

