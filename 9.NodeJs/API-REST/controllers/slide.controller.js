const Slide = require('../models/slide.model');
const fs = require('fs');

let getSlide =  async (req, res) => {
    console.log("hace la peticion GET slide");
    // try {
    //     let slides = await Slide.find({});
    //     let count = await Slide.countDocuments({});
    //     return res.json({
    //         status: 200,
    //         message: 'ok, esto es con async await',
    //         slides,
    //         count
    //     });
    // } catch (error) {
    //     return res.json({
    //         status: 500,
    //         message: 'Error al realizar la peticion'
    //     });
    // }
    Slide.find({}).exec((err, slides) => {
        if (err){
            return res.json({
                status: 500,
                message: 'Error al realizar la peticion'
            });
        }

        //contar cantidad de registros
        Slide.countDocuments({}, (err, count) => {
            res.json({
                status: 200,
                slides,
                count
            });
        });
       
    });
}


// //peticion post
let createSlide = (req, res) => {
    console.log("hace la peticion POST");
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
    archivo.mv(`./public/resources/uploads/slide/${nombreArchivo}`, err => {
        if (err){
            return res.status(500).send("Error al subir el archivo");
        }
        //guardamos la ruta en la base de datos
        const {  titulo, descripcion } = req.body;
        let slide = new Slide({
            imagen: `./public/resources/uploads/slide/${nombreArchivo}`,
            titulo: titulo,
            descripcion: descripcion
        });

        //para guardar en mongo db
        //usamos la funcion y depues le pasamos un callback
        //el callback recibe un error y un objeto
        slide.save((err, slideDB) => {
            if (err){
                return res.json({
                    status: 500,
                    message: 'Error al realizar la peticion'
                });
            }
            res.json({
                status: 200,
                data: slideDB
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
const deleteSlide = (req, res) => {
    console.log("hace la peticion DELETE del Slide");
    let id = req.params.id;
    // validamos que el slide exista
    Slide.findById(id, (err, slide) =>{
        if (err) {
            return res.json({
                status: 500,
                message: 'Error al realizar la peticion'
            });
        }
        if (!slide){
            return res.json({
                status: 500,
                message: 'El Slide no existe en la base de datos'
            });
        }

        //eliminamos la imagen
        let pathImagen = slide.imagen;
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }

        //eliminamos el slide en mongo db
        Slide.findByIdAndRemove(id, (err, slide) => {
            if (err) {
                return res.json({
                    status: 500,
                    message: 'Error al borrar la peticion'
                });
            }
            res.json({
                status: 200,
                message: 'Slide ha sido eliminado correctamente'
            });
        });
    })
}

//peticion put
const updateSlide =  (req, res) =>  {
    console.log("hace la peticion PUT Slide");
    //capturamos la id del slide
    let id = req.params.id;
    //obtenemos el cuerpo del formulario
    let body = req.body;

    //1. Validamos que el slide si exista

    Slide.findById(id, (err, slide) => {
        if (err){
            return res.json({
                status: 500,
                message: 'Error al realizar la peticion'
            });
        }
        if (!slide){
            return res.json({
                status: 500,
                message: 'El Slide no existe'
            });
        }

        let rutaImagen = slide.imagen;

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
                        archivo.mv(`./public/resources/uploads/slide/${nombreArchivo}`, err => {
                            if (err){
                                // return res.status(500).send("Error al subir el archivo");
                                reject({res: res, message: 'Error al subir el archivo'});
                            }

                            //borramos la antigua imagen
                            if (fs.existsSync(rutaImagen)) {
                                console.log("borramos la antigua imagen");
                                fs.unlinkSync(rutaImagen);
                            }


                            //guardamos la ruta 
                            
                            resolve(`./public/resources/uploads/slide/${nombreArchivo}`);
                        });

                }else{
                    resolve(rutaImagen);
                }
            })
        }
    
        //3. Actualizar el registro
        let changeRegister = (id, body, slide, rutaImagen) => {
            return new Promise((resolve, reject) => {
                
            let datosSlide = {
                imagen: rutaImagen,
                titulo: body.titulo ? body.titulo : slide.titulo,
                descripcion: body.descripcion ? body.descripcion : slide.descripcion
            }

            //para actualizar en mongo db
            Slide.findByIdAndUpdate(id, datosSlide, {new: true}, (err, slideDB) => {
                if (err){
                    reject({
                        res: res,
                        error: err
                    });
                }
                let response = {
                    res: res,
                    data: slideDB
                }

                resolve(response);
            });
        });
        }
        
        //4. Sincronizamos las promesas
        validarCambioImagen(req, rutaImagen).then((rutaImagen) => {

            changeRegister(id, body, slide, rutaImagen).then((response) => {
               response['res'].json({
                   status: 200,
                   data: response['data'],
                   message: 'Slide actualizado con exito'
               });
            }).catch((response) => {
                response['res'].json({
                    status: 400,
                    err: response['err'],
                    message: 'Error al actualizar el Slide'
                });
            });
        }).catch((response) => {
            response['res'].json({
                status: 400,
                err: response['message'],
                message: 'Error al actualizar el Slide'
            });
        })

    })

};


// exportamos las funciones del controlador
module.exports = {
    getSlide,
    createSlide,
    deleteSlide,
    updateSlide
}
