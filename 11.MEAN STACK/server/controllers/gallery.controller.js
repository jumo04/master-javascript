const Gallery = require('../models/gallery.model');

const fs = require('fs');

const path = require('path');

let getGallery = (req, res) => {
    console.log("hace la peticion GET galeria");
    Gallery.find({}).exec((err, galleries) => {
        if (err){
            return res.json({
                status: 500,
                message: 'Error al realizar la peticion'
            });
        }
        Gallery.countDocuments({}, (err, count) => {
            res.json({
                status: 200,
                galleries,
                count
            });
        });
    });
}

let getImg = (req, res) => {
    console.log("hace la peticion GET imagen");
    let imagen = req.params.imagen;
    let pathImagen = `./public/resources/uploads/gallery/${imagen}`;
    //verificamos si existe la imagen
    if (!fs.existsSync(pathImagen)) {
        return res.status(400).send("No existe la imagen");
    }
    //si existe la imagen
    res.sendFile(path.resolve(pathImagen));
}



// //peticion post
let createGallery = (req, res) => {
    console.log("hace la peticion POST Galeria");
    if (!req.files) {
        return res.status(500).send('La imagen no puede ir vacia');
    }

    //Capturamos el archivo
    let archivo = req.files.archivo;
    //validamos la extension del archivo
    if (archivo.mimetype != 'image/jpeg' && archivo.mimetype != 'image/png') {
        return res.status(500).send('El archivo debe ser JPG o PNG');
    }

    //validamos el tamano del archivo
    if (archivo.size > 2000000) {
        return res.status(500).send('El archivo debe ser menor a 2MB');
    }

    //renombramos el nombre del archivo//.pop trae el ultimo valor 
    let nombreArchivo = Math.floor(Math.random()*10000)+'.' + archivo.name.split('.').pop(); 
    console.log("nombreArchivo: " + nombreArchivo);

    //movemos el archivo de carpeta
    archivo.mv(`./public/resources/uploads/gallery/${nombreArchivo}`, err => {
        if (err){
            return res.status(500).send("Error al subir el archivo");
        }

        //creamos el objeto
        let gallery = new Gallery({
            foto: nombreArchivo
        });

        //para guardar en mongo db
        //usamos la funcion y depues le pasamos un callback
        //el callback recibe un error y un objeto
        gallery.save((err, gallery) => {
            if (err){
                return res.json({
                    status: 500,
                    message: 'Error al crear la galeria o la peticion'
                });
            }
            res.json({
                status: 200,
                data: gallery,
                message: 'Galeria creada con exito'
            });
        });
    });
    // return;

    // const { imagen, titulo, descripcion } = req.body;
    // let slide = new Slide({
    //     imagen: imagen,
    //     titulo: titulo,
    //     descripcion: descripcion
    // });

    // //para guardar en mongo db
    // //usamos la funcion y depues le pasamos un callback
    // //el callback recibe un error y un objeto
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
}

// //peticion delete
const deleteGallery = (req, res) => {
    console.log("hace la peticion DELETE Galeria");
    let id = req.params.id;
    // validamos que el slide exista
    Gallery.findById(id, (err, gallery) =>{
        if (err) {
            return res.json({
                status: 500,
                message: 'Error al realizar la peticion'
            });
        }
        if (!gallery){
            return res.json({
                status: 500,
                message: 'La Galeria no existe en la base de datos'
            });
        }

        //eliminamos la imagen
        let pathImagen = gallery.foto;
        if (fs.existsSync(`./public/resources/uploads/gallery/${pathImagen}`)) {
            fs.unlinkSync(`./public/resources/uploads/gallery/${pathImagen}`);
        }

        //eliminamos el slide en mongo db
        Gallery.findByIdAndRemove(id, (err) => {
            if (err) {
                return res.json({
                    status: 500,
                    message: 'Error al borrar la peticion'
                });
            }
            res.json({
                status: 200,
                message: 'la Galeria ha sido eliminado correctamente'
            });
        });
    })
}

//peticion put
const updateGallery=  (req, res) =>  {
    console.log("hace la peticion PUT Galeria");
    //capturamos la id del slide
    let id = req.params.id;
    //obtenemos el cuerpo del formulario
    let body = req.body;

    //1. Validamos que la foto si exista

    Gallery.findById(id, (err, gallery) => {
        if (err){
            return res.json({
                status: 500,
                message: 'Error al realizar la peticion'
            });
        }
        if (!gallery){
            return res.json({
                status: 500,
                message: 'la Galeria no existe'
            });
        }

        let rutaImagen = gallery.foto;

        //2. Validamos que haya cambio de imagen    
        let validarCambioImagen = (req, rutaImagen) => {
            return new Promise((resolve, reject) => {
                if (req.files) {
                    //Capturamos el archivo
                        let archivo = req.files.archivo;
                        if (!archivo) {
                            reject({res: res, message: 'La imagen no puede ir vacia'});
                        }
                        //validamos la extension del archivo
                        if (archivo.mimetype != 'image/jpeg' && archivo.mimetype != 'image/png') {
                            // return res.status(500).send('El archivo debe ser JPG o PNG');
                            reject({res: res, message: 'El archivo debe ser JPG o PNG'});
                        }

                        //validamos el tamano del archivo
                        if (archivo.size > 2000000) {
                            // return res.status(500).send('El archivo debe ser menor a 2MB');
                            reject({res: res, message: 'El archivo debe ser menor a 2MB'});
                        }

                        //renombramos el nombre del archivo//.pop trae el ultimo valor 
                        let nombreArchivo = Math.floor(Math.random()*10000)+'.' + archivo.name.split('.').pop(); 
                        console.log("nombreArchivo: " + nombreArchivo);

                        //movemos el archivo de carpeta
                        archivo.mv(`./public/resources/uploads/gallery/${nombreArchivo}`, err => {
                            if (err){
                                // return res.status(500).send("Error al subir el archivo");
                                reject({res: res, message: 'Error al subir el archivo'});
                            }

                            //borramos la antigua imagen
                            if (fs.existsSync(`./public/resources/uploads/gallery/${rutaImagen}`)) {
                                console.log("borramos la antigua imagen");
                                fs.unlinkSync(`./public/resources/uploads/gallery/${rutaImagen}`);
                            }


                            //guardamos la ruta 
                            
                            resolve(nombreArchivo);
                        });

                }else{
                    resolve(rutaImagen);
                }
            })
        }
    
        //3. Actualizar el registro
        let changeRegister = (id, body, rutaImagen) => {
            return new Promise((resolve, reject) => {
                
            let datosImagen = {
                foto: rutaImagen,
            }

            //para actualizar en mongo db
            Gallery.findByIdAndUpdate(id, datosImagen, {new: true}, (err, gallery) => {
                if (err){
                    reject({
                        res: res,
                        error: err
                    });
                }
                let response = {
                    res: res,
                    data: gallery
                }

                resolve(response);
            });
        });
        }
        
        //4. Sincronizamos las promesas
        validarCambioImagen(req, rutaImagen).then((rutaImagen) => {

            changeRegister(id, body, rutaImagen).then((response) => {
               response['res'].json({
                   status: 200,
                   data: response['data'],
                   message: 'Slide actualizado con exito'
               });
            }).catch((response) => {
                response['res'].json({
                    status: 400,
                    err: response['err'],
                    message: 'Error al actualizar la foto de la galeria'
                });
            });
        }).catch((response) => {
            response['res'].json({
                status: 400,
                err: response['message'],
                message: 'Error al actualizar la foto de la galeria'
            });
        })

    })

};


// exportamos las funciones del controlador
module.exports = {
    getGallery,
    createGallery,
    updateGallery,
    deleteGallery,
    getImg
}
