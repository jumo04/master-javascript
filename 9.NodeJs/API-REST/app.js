//podemos importar frameworks como express que tienen funciones que nos ayudan
// a implementar el servidor con seguridad extra algunos middlewares
//esta es la version vieja de node, ahora se trabaja con ECMMAScript import modules
const express = require("express");
const json = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


//Importamos las rutas dese la carpeta routes
const slideRoute = require('./routes/slide.route');
const galleryRoute = require('./routes/gallery.route');
const articleRoute = require('./routes/article.route');
const adminRoute = require('./routes/admin.route');

require('./config.js');
// const jsonstringify = require("jsonstringify");

const app = express();

app.disable('x-powered-by');

//Middlewares
app.use(bodyParser.json({limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

//middleware para subir archivos
app.use(fileUpload());


//Deprecated mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//importamos las rutas
app.use('/slide', slideRoute);
app.use('/gallery', galleryRoute);
app.use('/article', articleRoute);
app.use('/admin', adminRoute);


// CONEXION A LA BASE DE DATOS

//esta linea de codigo es para conectarnos a la base de datos
mongoose.connect('mongodb://localhost:27017/api_rest_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log("Base de datos online");
});

//aca es donde empezamos la conexion
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})