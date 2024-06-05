const mongoose = require('mongoose');


let adminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "El usuario es obligatorio"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"]
    }
});
//evitar devolver el campo pass ocultar campo desde el modelo
adminSchema.methods.toJSON = function() {
    let admin = this;
    let adminObject = admin.toObject();
    delete adminObject.password;
    return adminObject;
}

const Admin = mongoose.model("admins", adminSchema);


module.exports = Admin;