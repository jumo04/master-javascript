import React from "react";
import $ from "jquery";
import { Config } from "../../../config/Config";
import { useState } from "react";
import notie from "notie";
import Swal from "sweetalert2";

export default function EditDeleteSlide(data) {
  const [eSlide, editSlide] = useState({
    id: "",
    imagen: null,
    titulo: "",
    descripcion: "",
    success: false,
    errorTitle: false,
    errorImg: false,
    errorDesc: false,
    error: false,
    message: "",
  });

  const changeEditForm = (e) => {
    e.preventDefault();
    if ($("#editarImagen").val()) {
        let imagen = $("#editarImagen").get(0).files[0];
        if (imagen === undefined) {
            editSlide({
                ...eSlide,
                imagen: null,
            });
        } //validamos el tamaño de la imagen
        else if (imagen.size > 2000000) {
            notie.alert({
                type: 3,
                text: "La imagen es muy grande",
                time: 7,
            });
            editSlide({
                ...eSlide,
                errorImg: true,
                message: "La imagen es muy grande",
            });
        } //validamos si es jpg o png
        else if (imagen.type !== "image/jpeg" && imagen.type !== "image/png") {
            $("#imagen").val("");
            notie.alert({
                type: 3,
                text: "La imagen debe ser JPG o PNG",
                time: 7,
          });
          editSlide({
              ...eSlide,
              errorImg: true,
              message: "La imagen debe ser JPG o PNG",
            });
        } else {
            let datosArchivo = new FileReader();
            datosArchivo.readAsDataURL(imagen);
           
          $(datosArchivo).on("load", (event) => {
            let rutaArchivo = event.target.result;
            $(".preview-img").attr("src", rutaArchivo);
            editSlide({
                ...eSlide,
                imagen: imagen,
                errorImg: false,
                [e.target.name]: e.target.value
            })
            
          })

        }
        editSlide({
            ...eSlide,
            [e.target.name]: e.target.value
        })
        
    }else{
        editSlide({
            ...eSlide,
            [e.target.name]: e.target.value
          });
    }
  };

  const submitEditForm = async (e) => {
    e.preventDefault();
    const { imagen, titulo, descripcion, id} = eSlide;

    if (titulo !== "") {
      //validamos la expresion regular del titulo
      const exptitulo = /^([0-9a-zA-Z ]).{1,30}$/;
      if (!exptitulo.test(titulo)) {
        editSlide({
          ...eSlide,
          errortitulo: true,
          message: "El titulo debe ser de minimo 1 caracteres maximo 30",
        });
        return;
      }
    }

    if (descripcion !== "") {
      //validamos la expresion regular de la descripcion
      const expDesc = /^([0-9a-zA-Z ]).{1,1000}$/;
      if (!expDesc.test(descripcion)) {
        editSlide({
          ...eSlide,
          errorDesc: true,
          message: "La descripción debe ser de minimo 1 caracteres maximo 1000",
        });
        return;
      }
    }

    //funcion para enviar el formulario
    const result = await putData(eSlide);

    if (!result) {
      notie.alert({
        type: 3,
        text: result.message,
        time: 7,
      });
      editSlide({
        ...eSlide,
        error: true,
        message: result.message,
      });
      return;
    }

    if (result.status !== 200) {
        notie.alert({
            type: 3,
            text: result.message,
            time: 7,
          });
      editSlide({
        ...eSlide,
        error: true,
        message: result.message,
      });
    }
    if (result.status === 200) {
        notie.alert({
            type: 1,
            text: "Slide Actualizado con exito",
            time: 7,
          });
      editSlide({
        ...eSlide,
        error: false,
        errortitulo: false,
        errorImg: false,
        errorDesc: false,
        success: true,
        message: "Slide Actualizado con exito",
      });
      $('button[type="submit"]').remove();
      setTimeout(() => {
        window.location.href = "/slide";
      }, 3000);
    }
  }

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
  $(document).on("click", ".editarSlide", async function (e) {
    e.preventDefault();
    let data = $(this).attr("data").split("_,");

    $("#editarId").val(data[0]);
    $(".preview-img").attr("src", `${Config.API_URL}/slide/mostrar/${data[1]}`);
    $("#editarTitulo").val(data[2]);
    $("#editarDesc").val(data[3]);

    editSlide({
        id: data[0],
        titulo: data[2],
        descripcion: data[3],
        errortitulo: false,
        errorImg: false,
        errorDesc: false,
        error: false,
        message: "",
      });
  });

  // Capturamos los valores para borrarlos de los inputs
  $(document).on("click", ".borrarSlide", async function (e) {
    e.preventDefault();
    let data = $(this).attr("data").split("_,")[0];

    Swal.fire({
      title: "¿Estas seguro que deseas eliminar este slide?",
      text: "No podras revertir esto!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
        if (result.value) {
            const results = await deleteSlide(data);
            if (results.status === 200) {
              Swal.fire({
                type: "success",
                title: "El slide ha sido eliminado!",
                text: results.message,
                showConfirmationButton: true,
                confirmButtonColor: "cerrar",
              }).then(function (result) {
                if (result.value) {
                  window.location.href = "/slide";
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
                  window.location.href = "/slide";
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
                  window.location.href = "/slide";
                }
              });
            }
        }
    });    
  });

  return (
    <div className="modal fade" id="editSlide">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Editar Slide</h4>
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

              <input
                type="hidden"
                name="id"
                id="editarId"
              />
              <div className="form-group">
                <label className="small text-secondary" htmlFor="editarImagen">
                  *Ingrese una imagen de peso maximo 2MB en formato png o jpeg
                </label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="form-control-file border"
                    name="imagen"
                    id="editarImagen"
                    placeholder="Seleccione una imagen"
                  />
                  <img className="preview-img img-fluid" />
                  <div
                    className="invalid-feedback"
                    style={{ display: eSlide.errorImg ? "block" : "none" }}
                  >
                    {" "}
                    {eSlide.message}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="editarTitulo">
                  *No ingresar caracteres especiales, solo letras y numeros
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-heading"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    id="editarTitulo"
                    placeholder="Ingrese el titulo"
                    pattern="([0-9a-zA-Z ]).{1,30}"
                  />
                  <div
                    className="invalid-feedback"
                    style={{ display: eSlide.errortitulo ? "block" : "none" }}
                  >
                    {" "}
                    {eSlide.message}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="editarDesc">
                  *No ingresar caracteres especiales solo letras y numeros
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="descripcion"
                    id="editarDesc"
                    placeholder="Ingrese la descripcion"
                    pattern="([0-9a-zA-Z ]).{1,100}"
                  />
                </div>
              </div>
              <div
                className="alert alert-danger text-center"
                style={{ display: eSlide.error ? "block" : "none" }}
              >
                {" "}
                {eSlide.message}
              </div>
              <div
                className="alert alert-success text-center"
                style={{ display: eSlide.success ? "block" : "none" }}
              >
                {" "}
                {eSlide.message}"
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
  
  const url = `${Config.API_URL}/slide/actualizar/${value.id}`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  let formData = new FormData();
 
  const { imagen, titulo, descripcion } = value;
  formData.append("archivo", imagen);
  formData.append("titulo", titulo);
  formData.append("descripcion", descripcion);

  const params = {
    method: "PUT",
    headers: {
      Authorization: token,
    },
    body: formData,
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

const deleteSlide = async (id) => {
  const url = `${Config.API_URL}/slide/eliminar/${id}`;
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
