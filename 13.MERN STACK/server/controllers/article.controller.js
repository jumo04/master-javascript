const Article = require('../models/article.model');

const fs = require('fs');
// creamos una carpeta nueva para cada articulo para eso importamos la libreria mkdirp
const mkdirp = require('mkdirp');
//esto lo usamos para borrar una carpeta dentro del servidor
const rimraf = require('rimraf');

const path = require('path');

let getArticle = (req, res) => {
    console.log("hace la peticion GET articulo");
    Article.find({}).exec((err, articles) => {
        if (err){
            return res.json({
                status: 500,
                message: 'Error al realizar la peticion'
            });
        }
        Article.countDocuments({}, (err, count) => {
            res.json({
                status: 200,
                articles,
                count
            });
        });
    });
}

let showImg = (req, res) => {
    console.log("hace la peticion GET imagen");
    let portada = req.params.portada;
    let root = req.params.path;
    let pathPortada = `./public/resources/uploads/article/${root}/${portada}`;
    //verificamos si existe la imagen
    if (!fs.existsSync(pathPortada)) {
        return res.status(400).send("No existe la imagen");
    }
    //si existe la imagen
    res.sendFile(path.resolve(pathPortada));
}

// //peticion post
let createArticle = async (req, res) => {
    console.log("hace la peticion POST Articulo");

    let body = req.body;
    
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

    //creamos una carpeta nueva para cada articulo
    let createDir = await mkdirp(`./public/resources/uploads/article/${body.url}`);
    //movemos el archivo de carpeta
    archivo.mv(`./public/resources/uploads/article/${body.url}/${nombreArchivo}`, err => {
        if (err){
            return res.status(500).send("Error al subir el archivo");
        }

        const { url, titulo, intro, contenido } = req.body;

        //creamos el objeto
        let article = new Article({
            portada: nombreArchivo,
            url: url,
            titulo: titulo,
            intro: intro,
            contenido: contenido
        });

        //para guardar en mongo db
        //usamos la funcion y depues le pasamos un callback
        //el callback recibe un error y un objeto
        article.save((err, articleDB) => {
            if (err){
                return res.json({
                    status: 500,
                    message: 'Error al crear el articulo o la peticion'
                });
            }
            res.json({
                status: 200,
                data: articleDB,
                message: 'Articulo creado con exito!'
            });
        });
    });
    // return;
}

// //peticion delete
const deleteArticle = (req, res) => {
    console.log("hace la peticion DELETE Articulo");
    let id = req.params.id;
    // validamos que el slide exista
    Article.findById(id, (err, article) =>{
        if (err) {
            return res.json({
                status: 500,
                message: 'Error al realizar la peticion'
            });
        }
        if (!article){
            return res.json({
                status: 500,
                message: 'El Articulo no existe en la base de datos'
            });
        }

        //borramos la carpeta completa
        let path = `./public/resources/uploads/article/${article.url}`;
        rimraf.sync(path);

        //eliminamos el slide en mongo db
        Article.findByIdAndRemove(id, (err) => {
            if (err) {
                return res.json({
                    status: 500,
                    message: 'Error al borrar el articulo o la peticion'
                });
            }
            res.json({
                status: 200,
                message: 'Articulo ha sido eliminado correctamente'
            });
        });
    })
}

//peticion put
const updateArticle =  (req, res) =>  {
    console.log("hace la peticion PUT Articulo");
    //capturamos la id del slide
    let id = req.params.id;
    //obtenemos el cuerpo del formulario
    let body = req.body;

    //1. Validamos que la foto si exista

    Article.findById(id, (err, article) => {
        if (err){
            return res.json({
                status: 500,
                message: 'Error al realizar la peticion'
            });
        }
        if (!article){
            return res.json({
                status: 500,
                message: 'El Articulo no existe'
            });
        }

        let rutaImagen = article.portada;
        let path = article.url;

        //2. Validamos que haya cambio de imagen    
        let validarCambioImagen = (req, body, path, rutaImagen) => {
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
                        archivo.mv(`./public/resources/uploads/article/${path}/${nombreArchivo}`, err => {
                            if (err){
                                // return res.status(500).send("Error al subir el archivo");
                                reject({res: res, message: 'Error al subir el archivo'});
                            }

                            //borramos la antigua imagen
                            if (fs.existsSync(`./public/resources/uploads/article/${path}/${rutaImagen}`)) {
                                console.log("borramos la antigua imagen");
                                fs.unlinkSync(`./public/resources/uploads/article/${path}/${rutaImagen}`);
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
        let changeRegister = (id, body, article, rutaImagen) => {
            return new Promise((resolve, reject) => {
            //agregamos los datos viejos a actualizar
            //validamos el body
            const { url, titulo, intro, contenido } = body;
            let datosArticulo = {
                portada: rutaImagen,
                url: url ? url : article.url,
                titulo: titulo ? titulo : article.titulo,
                intro: intro ? intro : article.intro,
                contenido: contenido ? contenido : article.contenido
            }

            //para actualizar en mongo db
            Article.findByIdAndUpdate(id, datosArticulo, {new: true}, (err, articleDB) => {
                if (err){
                    reject({
                        res: res,
                        error: err
                    });
                }
                let response = {
                    res: res,
                    data: articleDB
                }

                resolve(response);
            });
        });
        }
        
        //4. Sincronizamos las promesas
        validarCambioImagen(req, body, path, rutaImagen).then((rutaImagen) => {

            changeRegister(id, body, article, rutaImagen).then((response) => {
               response['res'].json({
                   status: 200,
                   data: response['data'],
                   message: 'Articulo actualizado con exito'
               });
            }).catch((response) => {
                response['res'].json({
                    status: 400,
                    err: response['err'],
                    message: 'Error al actualizar la portada del Articulo'
                });
            });
        }).catch((response) => {
            response['res'].json({
                status: 400,
                err: response['message'],
                message: 'Error al actualizar la portada del Articulo'
            });
        })

    })

};


// exportamos las funciones del controlador
module.exports = {
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    showImg
}
