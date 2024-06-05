import React from "react";
import $ from "jquery";
import { Config } from "../../../config/Config";
import { useState } from "react";
import notie from "notie";
import "notie/dist/notie.css";
import 'summernote/dist/summernote-lite.js';
import 'summernote/dist/summernote-lite.css';


export default function CreateArticle() {
  const [article, setArticle] = useState({
    portada: null,
    url: "",
    titulo: "",
    intro: "",
    contenido: "",
    success: false,
    error: false,
    message: "",
  });

  //formateamos url
  let formatUrl = (url) => {
    let text = url.toLowerCase();
    text = text.replace(new RegExp(/á|à|â|ä|ã/g), "a");
    text = text.replace(new RegExp(/é|è|ê|ë/g), "e");
    text = text.replace(new RegExp(/í|ì|î|ï/g), "i");
    text = text.replace(new RegExp(/ó|ò|ô|ö|õ/g), "o");
    text = text.replace(new RegExp(/ú|ù|û|ü/g), "u");
    text = text.replace(new RegExp(/ç/g), "c");
    text = text.replace(new RegExp(/ /g), "-");
    text = text.replace(new RegExp(/_/g), "-");
    text = text.replace(new RegExp(/\./g), "-");
    text = text.replace(new RegExp(/,/g), "-");
    text = text.replace(new RegExp(/\?/g), "-");
    text = text.replace(new RegExp(/!/g), "-");
    text = text.replace(new RegExp(/'/g), "-");
    text = text.replace(new RegExp(/\(/g), "-");
    return text;
  };

  $(document).on("keyup", '.inputUrl', function () {
        $(this).val(
            formatUrl($(this).val())
        );
  });



  //creamos el metodo que capture los datos del formulario onChange y validamos 
  const changeForm = (e) => {
    let portada = $("#portada").get(0).files[0];

    if (portada === undefined) {
      setArticle({
        ...article,
        portada: null,
        error: true,
        message: "Por favor, selecciona una imagen",
      });
      return;
    }

    //validamos el formato de la imagen
    if (portada.type !== "image/jpeg" && portada.type !== "image/png") {
      $("#portada").val("");
      notie.alert({
        type: 3,
        text: "La imagen debe ser JPG o PNG",
        time: 7,
      });
      setArticle({
        ...article,
        error: true,
        message: "La imagen debe ser JPG o PNG",
      });

      $(".preview-img").attr("src", "");
      return;
    }//validamos el tamaño de la imagen
    else if (portada.size > 2000000) {
      $("#portada").val("");
      notie.alert({
        type: 3,
        text: "La imagen es muy grande",
        time: 7,
      });
      setArticle({
        ...article,
        error: true,
        message: "La imagen es muy grande",
      });

      $(".preview-img").attr("src", "");
      return;
    }//si nada de eso ocurre, guardamos la imagen
    else{
      let datosArchivo = new FileReader();
      datosArchivo.readAsDataURL(portada);

      $(datosArchivo).on("load", (event) => {
        let rutaArchivo = event.target.result;
        $(".preview-img").attr("src", rutaArchivo);
        setArticle({
          portada: portada,
          url: $("#url").val(),
          titulo: $("#titulo").val(),
          intro: $("#intro").val(),
          contenido: $("#contenido").val(),
          success: false,
          error: false,
        });
      });
    }
 } 
 //organizamos en onsubtmit

  const submitPost = async (e) => {
    $(".alert").remove();
    e.preventDefault();
    const { portada, url, titulo, intro, contenido } = article;

    //validamos que todos los campos esten completos
    if (portada === null || url === "" || titulo === "" || intro === "" || contenido === "") {
      notie.alert({
        type: 3,
        text: "Todos los campos son obligatorios",
        time: 7,
      });
      return;
    }

    console.log("empieza a validar url");
    //validamos expresion regular
    if(url !== "" && !url.match(/^([\\-\\0-9a-zA-Z- ]).{1,50}/)){
      // 
      // let reg = /^([\\-\\-0-9a-zA-Z ]).{1,50}/;
      // if (!reg.test(url)) {
        $(".invalid-url").show();
        $(".invalid-url").html("Utiliza un formato que coincida con el solicitado");

        return;
      // }
    }


    if(titulo === ""){
      $(".invalid-title").show();
      $(".invalid-title").html("Completa el campo correctamente");
      return;
    }

    if(titulo !== "" && !titulo.match(/^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]).{1,30}/)){
      // && !url.match(/^([0-9a-zA-Z- ]).{1,50}/)
      // let regT = /^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]).{1,30}/;
      // if (!regT.test(url)) {
        $(".invalid-title").show();
        $(".invalid-title").html("Utiliza un formato que coincida con el solicitado");        
      // }
      return;
    }


    if(intro === ""){
      $(".invalid-intro").show();
      $(".invalid-intro").html("Completa el campo correctamente");
      return;
    }

    // if(intro !== ""){
    //   // && !url.match(/^([0-9a-zA-Z- ]).{1,50}/)
    //   let regI = /^([\\=\\&\\$\\_\\-\\*\\<\\>\\?\\!\\:\\.\\,\\;\\¿\\¡\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]).{1,1000}/;
    //   if (!regI.test(url)) {
    //     $(".invalid-intro").show();
    //     $(".invalid-intro").html("Utiliza un formato que coincida con el solicitado");        
    //   }
    //   return;
    // }

    if(contenido === ""){
      $(".invalid-content").show();
      $(".invalid-content").html("Completa el campo correctamente");
      return;
    }

    if(contenido !== "" && !contenido.match(/^([\\=\\&\\$\\_\\-\\*\\<\\>\\?\\!\\:\\.\\,\\;\\¿\\¡\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]).{1,5000}/)){
      // && !url.match(/^([0-9a-zA-Z- ]).{1,50}/)
      // let regC = /^([(\\)\\=\\&\\$\\_\\-\\*\\<\\>\\?\\!\\:\\.\\,\\;\\¿\\¡\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]).{1,5000}/;
      // if (!regC.test(url)) {
        $(".invalid-content").show();
        $(".invalid-content").html("Utiliza un formato que coincida con el solicitado");        
      // }
      return;
    }


    //funcion para enviar el formulario
    const result = await postData(article); 

  

    if (!result) {
      notie.alert({
        type: 3,
        text: result.message,
        time: 7,
      });
      return;
    }

    if (result.status === 400) {
      $(".modal-footer").before(`
        <div class="alert alert-danger" role="alert">
          ${result.message}
        </div>
      `);
      notie.alert({
        type: 3,
        text: result.message,
        time: 7,
      });
      return;
    }

    if (result.status === 200) {
      
      notie.alert({
        type: 1,
        text: result.message,
        time: 7,
      });
      setArticle({
        ...article,
        success: true,
        message: "Articulo creado con exito",
      });
      $('button[type="submit"]').remove();
      setTimeout(() => {
        window.location.href = "/articles";
      }, 3000);
      //limpiamos el formulario
    }
    return;
  }


  $(document).on("click", ".cleanForm", () => {
    setArticle({
      ...article,
      error: false,
      success: false,
      message: "",
    });
    $(".modal").find('form')[0].reset();
    $(".preview-img").attr("src", "");
  });

  //summernote

  $(document).ready(function() {
    $("#contenido").summernote({
      height: 300
    });
  });






  return (
    <div className="modal fade" id="createArticle">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-titulo ">Crear Article</h4>
            <button
              type="button"
              className="close cleanForm"
              data-dismiss="modal"
            >
              &times;
            </button>
          </div>

          <form onChange={changeForm}
          onSubmit={submitPost}
          encType="multipart/form-data">
            <div className="modal-body">
              <div className="form-group">
                <label className="small text-secondary" htmlFor="portada">
                  *Ingrese una imagen de peso maximo 2MB en formato png o jpeg
                </label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="form-control-file border"
                    name="portada"
                    id="portada"
                    placeholder="Seleccione una imagen"
                    required
                  />
                  <img className="preview-img img-fluid" />
                  <div
                    className="invalid-feedback"
                    style={{ display: article.error ? "block" : "none" }}
                  >
                    {" "}
                    {article.message}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="url">
                  *Ingresar una url de maximo 10 caracteres
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-link"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control inputUrl text-lowercase"
                    name="url"
                    id="url"
                    placeholder="Ingrese la url"
                    pattern="([\\-\\0-9a-zA-Z ]).{1,10}"
                  />
                  <div
                    className="invalid-feedback"
                    style={{ display: article.error ? "block" : "none" }}
                  >
                    {" "}
                    {article.message}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="titulo">
                  *No ingresar caracteres especiales, solo letras y numeros
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    id="titulo"
                    placeholder="Ingrese el titulo"
                    pattern="([0-9a-zA-Z ]).{1,30}"
                  />
                  <div
                    className="invalid-feedback"
                    style={{ display: article.error ? "block" : "none" }}
                  >
                    {" "}
                    {article.message}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="intro">
                  *Puedes escribir hasta 300 caracteres
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="intro"
                    id="intro"
                    placeholder="Ingrese el intro del articulo"
                    pattern='([\\=\\&\\$\\_\\-\\*\\<\\>\\?\\!\\:\\.\\,\\;\\¿\\¡\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]).{1,300}'
                    required
                 />
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="contenido">
                  *No todo el contenido en formato html
                </label>
                <div className="input-group mb-3">
                  <textarea
                    type="textarea"
                    className="form-control summernote"
                    rows="5"
                    name="contenido"
                    id="contenido"
                    placeholder="Ingrese el contenido"
                    ></textarea>
                </div>
              </div>
              <div
                className="alert alert-danger text-center"
                style={{ display: article.error ? "block" : "none" }}
              >
                {" "}
                {article.message}
              </div>
              <div
                className="alert alert-success text-center"
                style={{ display: article.success ? "block" : "none" }}
              >
                {" "}
                {article.message}"
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-success"
                  id="btnGuardar"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const postData = (value) => {
  const urlRoot = `${Config.API_URL}/article/create`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  let formData = new FormData();

  const { portada, url, titulo, intro, contenido } = value;
  
  formData.append("archivo", portada);
  formData.append("url", url);
  formData.append("titulo", titulo);
  formData.append("intro", intro);
  formData.append("contenido", contenido);

  const params = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: token,
    }
  };
  return fetch(urlRoot, params)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
