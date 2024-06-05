const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "El usuario es obligatorio"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    email:{
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    }
});
//evitar devolver el campo pass ocultar campo desde el modelo
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

//devolver mensaje personalizado para validaciones unicas como el usuario que debe de ser unico
userSchema.plugin(uniqueValidator, { message: 'El {PATH} ya esta registrado en la base de datos!' });

const User = mongoose.model("users", userSchema);


module.exports = User;