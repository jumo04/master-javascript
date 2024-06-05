import React from "react";
import $ from "jquery";
import { Config } from "../../../config/Config";
import { useState } from "react";
import notie from "notie";
import Swal from "sweetalert2";

export default function CreateDeleteGallery() {
  const [gallery, setGallery] = useState({
    fotos: null,
    success: false,
    error: false,
    message: "",
  });

  const changeFoto = (e) => {
    let fotos = $("#foto").get(0).files;
    for (let i = 0; i < fotos.length; i++) {
        if (fotos[i] === undefined) {
            setGallery({
              ...gallery,
              fotos: null,
            });
          } //validamos el tamaño de la imagen
          else if (fotos[i].size > 2000000) {
            notie.alert({
              type: 3,
              text: "La imagen es muy grande",
              time: 7,
            });
            setGallery({
              ...gallery,
              error: true,
              message: "La imagen es muy grande",
            });
            $(".vistaPrevia").hml("");

          } //validamos si es jpg o png
          else if (fotos[i].type !== "image/jpeg" && fotos[i].type !== "image/png") {
            $(".vistaPrevia").hml("");
            notie.alert({
              type: 3,
              text: "La imagen debe ser JPG o PNG",
              time: 7,
            });
            setGallery({
              ...gallery,
              error: true,
              message: "La imagen debe ser JPG o PNG",
            });
          } else {
            let datosArchivo = new FileReader();
            datosArchivo.readAsDataURL(fotos[i]);
      
            $(datosArchivo).on("load", (event) => {
              let rutaArchivo = event.target.result;
              $(".vistaPrevia").append(`
                  <div class="col-6 pt-2">
                      <img src="${rutaArchivo}" class="img-fluid" />
                  </div>
              `);
            });
            setGallery({
              fotos: fotos
            });
          }
    }


  };

  const submitFoto = async  (e) => {
    e.preventDefault();

    const { fotos } = gallery;
  
    
    if (fotos === null) {
      setGallery({
        ...gallery,
        error: true,
        message: "Completa este campo",
      });
      return;
    }
    

    //funcion para enviar el formulario
    for (let i = 0; i < fotos.length; i++) {
      $('.alert').remove();
      if (fotos[i] === null) {
        setGallery({
          ...gallery,
          error: true,
          message: "Completa este campo",
        });
        return;
      }

      const result = await postData(fotos[i]);

      if (!result) {
        notie.alert({
          type: 3,
          text: result.message,
          time: 7,
        });
        setGallery({
          ...gallery,
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
            setGallery({
          ...gallery,
          error: true,
          message: result.message,
        });
      }
      if (result.status === 200) {
          notie.alert({
              type: 1,
              text: "Foto creada con exito",
              time: 7,
            });
        setGallery({
          ...gallery,
          error: false,
          success: true,
          message: "Foto creada con exito",
        });
      }
      $('button[type="submit"]').remove();
        setTimeout(() => {
          window.location.href = "/gallery";
        }, 3000);
    }
  };

  $(document).on("click", ".cleanForm", () => {
    setGallery({
      ...gallery,
      success: false,
      error: false,
      message: "",
    });
    $(".modal").find('form')[0].reset();
    $(".vistaPrevia").html("");

  });

  $(document).on("click", ".borrarFoto", async function (e) {
    e.preventDefault();
    let data = $(this).attr("data");

    Swal.fire({
      title: "¿Estas seguro que deseas eliminar este foto?",
      text: "No podras volver atras!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
        if (result.value) {
            const results = await deletePhoto(data);
            if (results.status === 200) {
              Swal.fire({
                type: "success",
                title: "La foto ha sido eliminada!",
                text: results.message,
                showConfirmationButton: true,
                confirmButtonColor: "cerrar",
              }).then(function (result) {
                if (result.value) {
                  window.location.href = "/gallery";
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
                  window.location.href = "/gallery";
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
                  window.location.href = "/gallery";
                }
              });
            }
        }
    });    
  });

  return (
    <div className="modal fade" id="createGallery">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-titulo ">Crear Galeria</h4>
            <button
              type="button"
              className="close cleanForm"
              data-dismiss="modal"
            >
              &times;
            </button>
          </div>

          <form
            onChange={changeFoto}
            onSubmit={submitFoto}
            encType="multipart/form-data"
          >
            <div className="modal-body">
              <div className="form-group">
                <label className="small text-secondary" htmlFor="foto">
                  *Ingrese una imagen de peso maximo 2MB en formato png o jpeg
                </label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="form-control-file border"
                    name="foto"
                    id="foto"
                    multiple
                    required
                  />
                  <div
                    className="invalid-feedback"
                    style={{ display: gallery.error ? "block" : "none" }}
                  >
                    {" "}
                    {gallery.message}
                  </div>
                  <div className="vistaPrevia row"></div>
                </div>
              </div>
              <div
                className="alert alert-danger text-center"
                style={{ display: gallery.error ? "block" : "none" }}
              >
                {" "}
                {gallery.message}
              </div>
              <div
                className="alert alert-success text-center"
                style={{ display: gallery.success ? "block" : "none" }}
              >
                {" "}
                {gallery.message}"
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
  const url = `${Config.API_URL}/gallery/create`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  let formData = new FormData();
 
  formData.append("archivo", value);

  const params = {
    method: "POST",
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


const deletePhoto = async (id) => {
  const url = `${Config.API_URL}/gallery/eliminar/${id}`;
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

