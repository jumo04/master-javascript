//podemos importar frameworks como express que tienen funciones que nos ayudan
// a implementar el servidor con seguridad extra algunos middlewares
//esta es la version vieja de node, ahora se trabaja con ECMMAScript import modules
const express = require("express");
const json = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const jsonstringify = require("jsonstringify");



const app = express();

app.disable('x-powered-by');

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//este es el esquema de la base de datos en mongodb
let slideSchema = new mongoose.Schema({
    imagen:{
        type: String,
        required: true
    },
    titulo:{
        type: String,
        required: false
    },
    descripcion:{
        type: String,
        required: false
    }
});

const Slide = mongoose.model("slides", slideSchema);


// app.use();
// app.get("/", (req, res) => {
//     console.log("hace la peticion");
//     let out = {
//         name: "JUAN FERNANDO MORENO",
//         url: req.url,
//         app: "API REST"
//     }

//     res.send(out);
// });

//Hacemos las peticiones
app.get("/", (req, res) => {
    console.log("hace la peticion");
    Slide.find({}).exec((err, slides) => {
        if (err){
            return res.json({
                status: 500,
                message: 'Error al realizar la peticion'
            });
        }
        res.json({
            status: 200,
            data: slides
        });
    });
});

//peticion post
app.post("/", (req, res) => {
    console.log("hace la peticion POST");
    let body = req.body;
    let slide = {
        imagen: body.imagen,
        titulo: body.titulo,
        descripcion: body.descripcion
    };

    res.json(slide);

    // slide.save((err, slideDB) => {
    //     if (err){
    //         return res.json({
    //             status: 500,
    //             message: 'Error al realizar la peticion'
    //         });
    //     }
    //     res.json({
    //         status: 200,
    //         data: slideDB
    //     });
    // });
});

//peticion delete
app.delete("/eliminar-slide/:id", (req, res) => {
    console.log("hace la peticion DELETE");
    let id = req.params.id;

    res.json({
        id
    });
});

//peticion put
app.put("/actualizar-slide/:id", (req, res) => {
    console.log("hace la peticion PUT");
    let id = req.params.id;
    let body = req.body;

    res.json({
        id,
        body
    });

});


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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000");
})