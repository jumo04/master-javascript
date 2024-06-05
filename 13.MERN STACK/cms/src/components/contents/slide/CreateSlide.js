import React from "react";
import $ from "jquery";
import { Config } from "../../../config/Config";
import { useState } from "react";
import notie from "notie";
import "notie/dist/notie.css";

export default function CreateSlide() {
  const [slide, setSlide] = useState({
    imagen: null,
    titulo: "",
    descripcion: "",
    success: false,
    errortitulo: false,
    errorImg: false,
    errorDesc: false,
    error: false,
    message: "",
  });

  const changeForm = (e) => {
    let imagen = $("#imagen").get(0).files[0];

    if (imagen === undefined) {
      setSlide({
        ...slide,
        imagen: null,
      });
    } //validamos el tamaño de la imagen
    else if (imagen.size > 2000000) {
      notie.alert({
        type: 3,
        text: "La imagen es muy grande",
        time: 7,
      });
      setSlide({
        ...slide,
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
      setSlide({
        ...slide,
        errorImg: true,
        message: "La imagen debe ser JPG o PNG",
      });
    } else {
      let datosArchivo = new FileReader();
      datosArchivo.readAsDataURL(imagen);

      $(datosArchivo).on("load", (event) => {
        let rutaArchivo = event.target.result;
        $(".preview-img").attr("src", rutaArchivo);
      });
      setSlide({
        ...slide,
        errorImg: false,
        imagen: imagen,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const { imagen, titulo, descripcion } = slide;
    
    if (imagen === null) {
      setSlide({
        ...slide,
        errorImg: true,
        message: "Completa este campo",
      });
      return;
    }

    if (titulo !== "") {
      //validamos la expresion regular del titulo
      const exptitulo = /^([0-9a-zA-Z ]).{1,30}$/;
      if (!exptitulo.test(titulo)) {
        setSlide({
          ...slide,
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
        setSlide({
          ...slide,
          errorDesc: true,
          message: "La descripción debe ser de minimo 1 caracteres maximo 1000",
        });
        return;
      }
    }

    //funcion para enviar el formulario
    const result = await postData(slide);

    if (!result) {
      notie.alert({
        type: 3,
        text: result.message,
        time: 7,
      });
      setSlide({
        ...slide,
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
      setSlide({
        ...slide,
        error: true,
        message: result.message,
      });
    }
    if (result.status === 200) {
        notie.alert({
            type: 1,
            text: "Administrador creado con exito",
            time: 7,
          });
      setSlide({
        ...slide,
        error: false,
        errortitulo: false,
        errorImg: false,
        errorDesc: false,
        success: true,
        message: "Administrador creado con exito",
      });
      $('button[type="submit"]').remove();
      setTimeout(() => {
        window.location.href = "/slide";
      }, 3000);
    }
  };

  $(document).on("click", ".cleanForm", () => {
    setSlide({
      ...slide,
      titulo: "",
      descripcion: "",
      imagen: null,
      success: false,
      errortitulo: false,
      errorImg: false,
      errorDesc: false,
      error: false,
      message: "",
    });
    $(".modal").find('form')[0].reset();
    $(".preview-img").attr("src", "");
  });

  return (
    <div className="modal fade" id="createSlide">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-titulo ">Crear Slide</h4>
            <button type="button" className="close cleanForm" data-dismiss="modal">
              &times;
            </button>
          </div>

          <form
            onChange={changeForm}
            onSubmit={submitForm}
            encType="multipart/form-data"
          >
            <div className="modal-body">
              <div className="form-group">
                <label className="small text-secondary" htmlFor="imagen">
                  *Ingrese una imagen de peso maximo 2MB en formato png o jpeg
                </label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="form-control-file border"
                    name="imagen"
                    id="imagen"
                    placeholder="Seleccione una imagen"
                    required
                  />
                  <img className="preview-img img-fluid" />
                  <div
                    className="invalid-feedback"
                    style={{ display: slide.errorImg ? "block" : "none" }}
                  >
                    {" "}
                    {slide.message}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="titulo">
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
                    id="titulo"
                    placeholder="Ingrese el titulo"
                    pattern="([0-9a-zA-Z ]).{1,30}"
                  />
                  <div
                    className="invalid-feedback"
                    style={{ display: slide.errortitulo ? "block" : "none" }}
                  >
                    {" "}
                    {slide.message}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="descripcion">
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
                    id="descripcion"
                    placeholder="Ingrese la descripcion"
                    pattern="([0-9a-zA-Z ]).{1,100}"
                  />
                </div>
              </div>
              <div
                className="alert alert-danger text-center"
                style={{ display: slide.error ? "block" : "none" }}
              >
                {" "}
                {slide.message}
              </div>
              <div
                className="alert alert-success text-center"
                style={{ display: slide.success ? "block" : "none" }}
              >
                {" "}
                {slide.message}"
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

//funcion para enviar el formulario
const postData = (value) => {
  const url = `${Config.API_URL}/slide/create`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  let formData = new FormData();
 
  const { imagen, titulo, descripcion } = value;
  formData.append("archivo", imagen);
  formData.append("titulo", titulo);
  formData.append("descripcion", descripcion);

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
