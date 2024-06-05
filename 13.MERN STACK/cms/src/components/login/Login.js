import React from "react";
import { useState } from "react";
import { Config } from "../../config/Config";

export default function Login() {
    
  //HOOKS para iniciar sesion
    const [administrador, iniciarSesion] = useState({
        username: "",
        password: "",
        error: false,
        message: ""
    });

  //capturamos cambios del formulario para ejecutar la funcion del hook
    const changeForm = (e) => {
        iniciarSesion({
            ...administrador,
            [e.target.name] : e.target.value
        })

    }

  //funcion para iniciar sesion

    const login = async (e) => {
        e.preventDefault();

        const result = await loginApi(administrador);

        if (result.status !== 200) {
            iniciarSesion({
                ...administrador,
                error: true,
                message: result.message
            })
            return; 
        }
        //si todo sale bien
        //guardamos el token de autorizacion 
        localStorage.setItem('ACCESS_TOKEN', result.token);
        localStorage.setItem('USUARIO', result.data.username);
        localStorage.setItem('ID', result.data._id);

        window.location.href = "/";
    }
   
  //para retonrnar la vis
  return (
    <div className="login-box" style={{ minHeight: "512.391px" }}>
      <div className="login-logo">
          <b>CMS</b>
      </div>
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Ingresa a tu sesion</p>

          <form onChange={changeForm} onSubmit={login}>
            <div className="input-group mb-3">
              <input type="username" className="form-control" placeholder="username" name="username" />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
              <div className="alert alert-danger" style={{ display: administrador.error ? "block" : "none" }}> {administrador.message}</div>
            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Ingresar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


const loginApi = data => {
    const url = `${Config.API_URL}/admin/ingresar`;
    const params = {
        method: "POST", //primero que se le menciona es el metodo que se va a utilizar
        headers: { //despues le pasamos las cabceras o headers, en este caso el tipo de contenido que se va a enviar
            "Content-Type": "application/json" // el header contiene la informacion importante
        },
        body: JSON.stringify(data) //
    }
    // const response = await fetch(url, params);  
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(error => {
        return error;
    });
}
//     const result = await response.json(); 
//     return result;
// }