import React from "react";
import $ from "jquery";
import { Config } from "../../../config/Config";
import { useState } from "react";

export default function CrearAdmin() {
  const [admin, setAdmin] = useState({
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

    if (password === "") {
      setAdmin({
        ...admin,
        errorPass: true,
        message: "Completa este campo",
      });
      return;
    }
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
    //funcion para enviar el formulario
    const result = await postData(admin);

    console.log(result);
    if (!result) {
        setAdmin({
            ...admin,
            error: true,
            message: result.message
        })
        return;
    }
    
    if (result.status !== 200) {
        setAdmin({
            ...admin,
            error: true,
            message: result.message
        })
    }
     if (result.status === 200) {
        setAdmin({
            ...admin,
            error: false,
            errorUser: false,
            errorPass: false,
            success: true,
            message: "Administrador creado con exito"
        })
        $('button[type="submit"]').remove();
        setTimeout(() => {window.location.href = "/";}, 3000);
    }
  };



  return (
    <div className="modal fade" id="crearAdmin">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Ingresar el nuevo administrador</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <form onChange={changeForm} onSubmit={submitForm}>
            <div className="modal-body">
              <div className="form-group">
                <label className="small text-secondary" htmlFor="username">
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
                    id="username"
                    placeholder="Ingrese su usuario"
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
                <label className="small text-secondary" htmlFor="password">
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
                    id="password"
                    placeholder="Ingrese su contraseña"
                    minLength={8}
                    pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}"
                    required
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

//funcion para enviar el formulario
const postData =  value => {
  const url = `${Config.API_URL}/admin/create`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  const { username, password } = value;
  const newAdmin = {
    username,
    password,
  };
  
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(newAdmin),
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
