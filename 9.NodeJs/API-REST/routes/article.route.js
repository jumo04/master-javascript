const express = require("express");
const articleRoute = express();
//importamos el controlador
const articleController = require("../controllers/article.controller.js");

const { verificarToken } = require('../middlewares/auth');

// creamos las rutas
articleRoute.get("/mostrar", articleController.getArticle);
articleRoute.post("/create",  verificarToken, articleController.createArticle);
articleRoute.put("/actualizar/:id", verificarToken, articleController.updateArticle);
articleRoute.delete("/eliminar/:id", verificarToken, articleController.deleteArticle);

module.exports = articleRoute;

