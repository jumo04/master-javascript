import React from "react";
import $ from "jquery";
import { Config } from "../../../config/Config";
import { useState } from "react";
import notie from "notie";
import Swal from "sweetalert2";
import 'summernote/dist/summernote-lite.js';
import 'summernote/dist/summernote-lite.css';

export default function EditDeleteArticle(data) {
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

  const changeEditForm = (e) => {
    let portada = $("#editPortada").get(0).files[0];
    if ($("#editPortada").val()) {
        
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
      } //validamos el tamaño de la imagen
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
      } //si nada de eso ocurre, guardamos la imagen
      else {
        let datosArchivo = new FileReader();
        datosArchivo.readAsDataURL(portada);
  
        $(datosArchivo).on("load", (event) => {
          let rutaArchivo = event.target.result;
          $(".preview-img").attr("src", rutaArchivo);

          setArticle({
            id: article.id,
            portada: portada,
            url: article.url,
            titulo: $("#editTitulo").val(),
            intro: $("#editIntro").val(),
            contenido: $("#editContenido").val(),
            success: false,
            error: false,
          });
        });
      }
    }else{
        setArticle({
            id: article.id,
            portada: null,
            url: article.url,
            titulo: $("#editTitulo").val(),
            intro: $("#editIntro").val(),
            contenido: $("#editContenido").val(),
            success: false,
            error: false,
          });
    }
  };

  const submitEditForm = async (e) => {
    $(".alert").remove();
    e.preventDefault();

    const { titulo, intro } = article;

    let contenido = $("#editContenido").val();
    article.contenido = contenido;


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

      const result = await putData(article);
      
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
  };

  //   // Capturamos los valores de los inputs
  //   $(document).on("click", ".editarInputs", async function (e) {
  //     e.preventDefault();
  //     let data = $(this).attr("data");
  //     const result = await getOneslide(data);
  //     editSlide({
  //       ...slide,
  //       id: result.slide._id,
  //       username: result.slide.username,
  //     });
  //   });

  //Capturamos los datos para editarlos
  $(document).on("click", ".editIArticle", async function (e) {
    e.preventDefault();
    let data = $(this).attr("data").split("_,");

    $("#idAriticle").val(data[0]);
    $("#editUrl").val(data[1]);
    $(".preview-img").attr("src", `${Config.API_URL}/article/mostrar/${data[1]}/${data[2]}`);
    $("#editTitulo").val(data[3]);
    $("#editIntro").val(data[4]);

    $("#editContenido").val(data[5]);
    $("#editContenido").summernote({
        height: 300
      });

      setArticle({
        id: data[0],
        portada: null,
        url: data[1],
        titulo: data[3],
        intro: data[4],
        contenido: data[5],
        success: false,
        error: false,
      });

  });

  // Capturamos los valores para borrarlos de los inputs
  $(document).on("click", ".deleteIArticle", async function (e) {
    e.preventDefault();
    let data = $(this).attr("data").split("_,")[0];

    Swal.fire({
      title: "¿Estas seguro que deseas eliminar este articulo?",
      text: "No podras revertir esto!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.value) {
        const results = await deleteArticle(data);
        if (results.status === 200) {
          Swal.fire({
            type: "success",
            title: "El slide ha sido eliminado!",
            text: results.message,
            showConfirmationButton: true,
            confirmButtonColor: "cerrar",
          }).then(function (result) {
            if (result.value) {
              window.location.href = "/articles";
            }
          });
        }
        if (results.status === 400) {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: results.message,
            showConfirmationButton: true,
            confirmButtonColor: "cerrar",
          }).then(function (result) {
            if (result.value) {
              window.location.href = "/articles";
            }
          });
        }
        if (results.status === 404) {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: results.message,
            showConfirmationButton: true,
            confirmButtonColor: "cerrar",
          }).then(function (result) {
            if (result.value) {
              window.location.href = "/articles";
            }
          });
        }
      }
    });
  });


  return (
    <div className="modal fade" id="editArticle">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Editar Article</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <form
            onChange={changeEditForm}
            onSubmit={submitEditForm}
            encType="multipart/form-data"
          >
            <div className="modal-body">
                <input type="hidden" name="idArticle" />
              <div className="form-group">
                <label className="small text-secondary" htmlFor="editPortada">
                  *Ingrese una imagen de peso maximo 2MB en formato png o jpeg
                </label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="form-control-file border"
                    name="portada"
                    id="editPortada"
                    placeholder="Seleccione una imagen"
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
                <label className="small text-secondary" htmlFor="editUrl">
                  *La url no se puede modificar
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-link"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control inputUrl text-lowercase"
                    name="url"
                    id="editUrl"
                    placeholder="Ingrese la url"
                    pattern="([\\-\\0-9a-zA-Z ]).{1,10}"
                    readOnly
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
                <label className="small text-secondary" htmlFor="editTitulo">
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
                    id="editTitulo"
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
                <label className="small text-secondary" htmlFor="editIntro">
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
                    id="editIntro"
                    placeholder="Ingrese el intro del articulo"
                    pattern="([\\=\\&\\$\\_\\-\\*\\<\\>\\?\\!\\:\\.\\,\\;\\¿\\¡\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]).{1,300}"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="editContenido">
                  *No todo el contenido en formato html
                </label>
                <div className="input-group mb-3">
                  <textarea
                    type="textarea"
                    className="form-control summernote"
                    rows="5"
                    name="contenido"
                    id="editContenido"
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

// //funcion para recibir los datos del usuario
// const getOneSlide = async (id) => {
//   const url = `${Config.API_URL}/slide/obtener/${id}`;
//   const token = localStorage.getItem("ACCESS_TOKEN");
//   const params = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//   };
//   return fetch(url, params)
//     .then((response) => response.json())
//     .then((result) => {
//       return result;
//     })
//     .catch((err) => {
//       return err;
//     });
// };

// //funcion para enviar el formulario
const putData = (value) => {
  const root = `${Config.API_URL}/article/actualizar/${value.id}`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  let formData = new FormData();

  const { portada, url, titulo, intro, contenido } = value;
  
  formData.append("archivo", portada);
  formData.append("url", url);
  formData.append("titulo", titulo);
  formData.append("intro", intro);
  formData.append("contenido", contenido);


  const params = {
    method: "PUT",
    headers: {
      Authorization: token,
    },
    body: formData,
  };
  return fetch(root, params)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

const deleteArticle = async (id) => {
  const url = `${Config.API_URL}/article/eliminar/${id}`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, params)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
