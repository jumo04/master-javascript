const Admin = require('../models/admin.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('../config.js');

const getAdmins = (req, res) => {
    console.log("hace la peticion GET admin");
    Admin.find({}).exec((err, admins) => {
        if (err){
            return res.json({
                status: 500,
                message: 'Error al realizar la peticion'
            });
        }   
        Admin.countDocuments({}, (err, count) => {
            res.json({  
                status: 200,
                count,          
                admins
            });                                                          
        });
    });
}

const getAdmin = (req, res) => {
    console.log("hace la peticion GET admin");
    let id = req.params.id;
    Admin.findById(id, (err, admin) => {
        if (err){
            return res.json({       
                status: 500,
                message: 'Error al realizar la peticion'            
            }); 
        }
        if (!admin){
            return res.json({       
                status: 404,
                message: 'El admin no existe en la base de datos'            
            }); 
        }
        res.json({
            status: 200,
            admin
        });
    });
}

const createAdmin = (req, res) => {
    console.log("hace la peticion POST admin");
    let body = req.body;
    let admin = new Admin({
        username: body.username.toLowerCase(),
        password: bcrypt.hashSync(body.password, 10)
    });
    admin.save(admin, (err, adminDB) => {
        if (err){
            return res.json({       
                status: 500,
                message: 'Error al crear el admin o la peticion'            
            }); 
        }
        res.json({
            status: 200,
            adminDB
        });
    });
}

const updateAdmin = (req, res) => {
    console.log("hace la peticion PUT del admin");

    let id = req.params.id;


    //validamos que el admin exista
    Admin.findById(id, (err, admin) => {
        if (err){
            return res.json({       
                status: 500,
                message: 'Error al realizar la peticion'            
            }); 
        }
        if (!admin){
            return res.json({       
                status: 404,
                message: 'El admin no existe en la base de datos'            
            }); 
        }
        
        let oldPass = admin.password;
        let body = req.body;
        let validarCambioPass = (body, oldPass) => {
            return new Promise((resolve, reject) => {
                //validamos que si ingrese una nueva contraseña
                if (body.password == undefined){
                    resolve(oldPass);
                }else{
                    oldPass = bcrypt.hashSync(body.password, 10);
                    resolve(oldPass);
                }
            });

        }

        let cambioRegistroAdmin = (id, body, pass) => {
            return new Promise((resolve, reject) => {
                let datosAdmin = {
                    username: body.username,
                    password: pass
                }

                Admin.findByIdAndUpdate(id, datosAdmin, {new: true, runValidators: true}, (err, adminDB) => {
                    if (err){

                        reject({res: res,
                            error: err});

                    }

                    let response = {
                        res: res,
                        data: adminDB
                    }
                    resolve(response);
                });
            });
        }


        validarCambioPass(body, oldPass).then((pass) => {
            cambioRegistroAdmin(id, body, pass).then((response) => {
                response['res'].json({
                    status: 200,
                    data: response['adminDB'],
                    message: 'Admin actualizado con exito'
                });
            }).catch((response) => {
                response['res'].json({
                    status: 400,
                    err: response['error'],
                    message: 'Error al actualizar el admin'
                });
            })
        }).catch((response) => {
            response['res'].json({
                status: 400,
                err: response['message'],
                message: 'Error al actualizar la foto de la galeria'
            });
        })
    })
    
}

const deleteAdmin = (req, res) => {
    console.log("hace la peticion DELETE del admin");

    let id = req.params.id;

    //evitamos que el ultimo registro sea eliminado

    Admin.find({}).exec((err, data) => {
        Admin.countDocuments({}, (err, count) => {
            if (count == 1){
                return res.json({  
                    status: 400,
                    message: 'No se puede eliminar el ultimo usuario'
                });
            }

            //validamos que el admin exista

            
            Admin.findById(id, (err, admin) => {
                if (err){
                    return res.json({       
                        status: 500,
                        message: 'Error al realizar la peticion'            
                    }); 
                }
                if (!admin){
                    return res.json({       
                        status: 404,
                        message: 'El admin no existe en la base de datos'            
                    });
                }
        
                Admin.findByIdAndDelete(id, (err, adminDB) => {
                    if (err){
                        return res.json({       
                            status: 500,
                            message: 'Error al realizar la peticion'            
                        }); 
                    }
                    res.json({
                        status: 200,
                        data: adminDB,
                        message: 'Admin eliminado con exito'
                    });
                })
        
            })  
        });

    });

          
}

let login = (req, res) => {

    console.log("hace la peticion POST login");

    let body = req.body;

    Admin.findOne({username: body.username}, (err, adminDB) => {
        if (err){
            return res.json({       
                status: 500,
                message: 'Error al realizar la peticion'            
            }); 
        }
        if (!adminDB){
            return res.json({       
                status: 404,
                message: 'El admin no existe en la base de datos'            
            });
        }

        if (!bcrypt.compareSync(body.password, adminDB.password)){
            res.json({       
                status: 400,
                message: 'El password es incorrecto'            
            });
        }else{
            //generamos el token de autorizacion
            let token = jwt.sign({
                admin: adminDB
            }, process.env.SEED, { expiresIn: process.env.EXP });

            res.json({
                status: 200,
                data: adminDB,
                token: token
            });
        }
    })
}


module.exports = {
    getAdmins,
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    login
}

