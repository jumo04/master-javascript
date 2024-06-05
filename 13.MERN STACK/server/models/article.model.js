const mongoose = require('mongoose');


let articleSchema = new mongoose.Schema({
    portada:{
        type: String,
        required: [true, "La portada es obligatoria"]
    },
    url:{
        type: String,
        required: [true, "La url es obligatoria"]
    },
    titulo:{
        type: String,
        required: [true, "La titulo es obligatoria"]
    },
    intro:{
        type: String,
        required: [true, "El intro es obligatoria"]
    },
    contenido:{
        type: String,
        required: [true, "El contenido es obligatoria"]
    }
});

// exportamos el modulo
module.exports  = mongoose.model("articles", articleSchema);
