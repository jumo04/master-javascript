const mongoose = require('mongoose');


let gallerySchema = new mongoose.Schema({
    foto:{
        type: String,
        required: [true, "La imagen es obligatoria"]
    }
});

const Gallery = mongoose.model("galleries", gallerySchema);

module.exports = Gallery;