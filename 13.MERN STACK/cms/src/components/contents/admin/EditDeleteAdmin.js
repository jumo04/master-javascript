import React from "react";
import $, { type } from "jquery";
import { Config } from "../../../config/Config";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditDeleteAdmin(data) {
  const [admin, setAdmin] = useState({
    id: "",
    username: "",
    password: "",
    success: false,
    errorUser: false,
    errorPass: false,
    error: false,
    message: "",
  });

  const changeForm = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const { username, password } = admin;

    if (username === "") {
      setAdmin({
        ...admin,
        errorUser: true,
        message: "Completa este campo",
      });
      return;
    }

    //   validamos expresion regular
    const expUser = /^[a-zA-Z0-9]{2,6}$/;
    if (!expUser.test(username)) {
      setAdmin({
        ...admin,
        errorUser: true,
        message:
          "El usuario debe ser de minimo 2 caracteres maximo 6, sin numeros",
      });
      return;
    }

    if (password !== "") {
      //validamos la expresion regular del password
      const expPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}$/;
      if (!expPass.test(password)) {
        setAdmin({
          ...admin,
          errorPass: true,
          message:
            "La contraseña debe ser de minimo 8 caracteres, incluir mayusculas, minusculas y numeros",
        });
      }
    }
    //funcion para enviar el formulario
    const result = await putData(admin);

    if (!result) {
      setAdmin({
        ...admin,
        error: true,
        message: result.message,
      });
      return;
    }

    if (result.status !== 200) {
      setAdmin({
        ...admin,
        error: true,
        message: result.message,
      });
    }
    if (result.status === 200) {
      setAdmin({
        ...admin,
        error: false,
        errorUser: false,
        errorPass: false,
        success: true,
        message: "Administrador actualizado con exito!",
      });
      $('button[type="submit"]').remove();
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  };

  // Capturamos los valores de los inputs
  $(document).on("click", ".editarInputs", async function (e) {
    e.preventDefault();
    let data = $(this).attr("data");
    const result = await getOneAdmin(data);
    setAdmin({
      ...admin,
      id: result.admin._id,
      username: result.admin.username,
    });
  });

  // Capturamos los valores para borrarlos de los inputs
  $(document).on("click", ".borrarInput", async function (e) {
    e.preventDefault();
    let data = $(this).attr("data");

    Swal.fire({
      title: "¿Estas seguro que deseas eliminar este administrador?",
      text: "No podras revertir esto!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.value) {
        const results = await deleteAdmin(data);
        if (results.status === 200) {
          Swal.fire({
            type: "success",
            title: "El Administrador ha sido eliminado!",
            text: results.message,
            showConfirmationButton: true,
            confirmButtonColor: "cerrar",
          }).then(function (result) {
            if (result.value) {
              window.location.href = "/";
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
              window.location.href = "/";
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
              window.location.href = "/";
            }
          });
        }
      }
    });
  });

  return (
    <div className="modal fade" id="editAdmin">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Editar administrador</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <form onChange={changeForm} onSubmit={submitForm}>
            <div className="modal-body">
              <div className="form-group">
                <label className="small text-secondary" htmlFor="editUsername">
                  *Ingrese su usuario de minimo 2 caracteres maximo 6, sin
                  numeros
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-user"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="editUsername"
                    placeholder="Editar usuario"
                    defaultValue={admin.username ? admin.username : ""}
                    minLength={2}
                    maxLength={6}
                    pattern="(?=.*[A-Za-z]).{2,6}"
                    required
                  />
                  <div
                    className="invalid-feedback"
                    style={{ display: admin.errorUser ? "block" : "none" }}
                  >
                    {" "}
                    {admin.message}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="editPassword">
                  *Ingrese su contraseña minimo 8 caractere, letras en
                  mayuscula, en minuscula y numeros
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-key"></i>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="editPassword"
                    placeholder="Ingrese su contraseña"
                    minLength={8}
                    pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}"
                  />
                </div>
              </div>
              <div
                className="alert alert-danger text-center"
                style={{ display: admin.error ? "block" : "none" }}
              >
                {" "}
                {admin.message}
              </div>
              <div
                className="alert alert-success text-center"
                style={{ display: admin.success ? "block" : "none" }}
              >
                {" "}
                {admin.message}"
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
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
const getOneAdmin = async (id) => {
  const url = `${Config.API_URL}/admin/obtener/${id}`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  const params = {
    method: "GET",
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

// //funcion para enviar el formulario
const putData = (value) => {
  const url = `${Config.API_URL}/admin/actualizar/${value.id}`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  const { username, password } = value;
  const admin = {
    username,
    password,
  };

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(admin),
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

const deleteAdmin = async (id) => {
  const url = `${Config.API_URL}/admin/eliminar/${id}`;
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
