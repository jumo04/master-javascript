//este es el esquema de la base de datos en mongodb
const mongoose = require('mongoose');


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

module.exports = Slide;