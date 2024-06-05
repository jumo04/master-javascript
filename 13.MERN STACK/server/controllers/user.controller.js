const User = require('../models/user.model.js');

const bcrypt = require('bcrypt');

require('../config.js');

const getUsers = (req, res) => {
    console.log("hace la peticion GET User");
    User.find({}).exec((err, users) => {
        if (err){
            return res.json({
                status: 500,
                message: 'Error al realizar la peticion'
            });
        }   
        User.countDocuments({}, (err, count) => {
            res.json({  
                status: 200,
                count,          
                users
            });                                                          
        });
    });
}

const createUser = (req, res) => {
    console.log("hace la peticion POST User");
    let body =  req.body;
    let user = new User({
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email
    });

    user.save(user, (err, userDB) => {
        if (err){
            return res.status(500).json({       
                status: 500,
                message: err.message,
                err         
            }); 
        }
        res.json({
            status: 200,
            message: 'Usuario creado exitosamente!',
            userDB
        });
    });
}

let loginUser = (req, res) => {

    console.log("hace la peticion POST login");

    let body = req.body;

    User.findOne({username: body.username}, (err, userDB) => {
        if (err){
            return res.json({       
                status: 500,
                message: 'Error al realizar la peticion'            
            }); 
        }
        if (!userDB){
            return res.json({       
                status: 404,
                message: 'El usuario no existe en la base de datos'            
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)){
            res.json({       
                status: 400,
                message: 'El password es incorrecto'            
            });
        }else{
            res.json({
                status: 200,
                message: "Login correcto"
            });
        }
    })
}


module.exports = {
    getUsers,
    createUser,
    loginUser
}

