import React from "react";

import { Fragment } from "react";

import Logo from "./AdminLTELogo.png";
import Photo from "./user4-128x128.jpg";



export default function Sidebar() {

  const username = localStorage.getItem('USUARIO');
  return (
    <Fragment>
      <aside
        className="main-sidebar sidebar-dark-primary elevation-4"
        style={{ height: "100vh" }}
      >
        <a href="index3.html" className="brand-link">
          <img
            src={Logo}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">CMS</span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={Photo}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#/" className="d-block">
                {username ? username : ''}
              </a>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
                  <li className="nav-item">
                    <a href="/" className="nav-link active">
                      <i className="nav-icon fas fa-user-lock"></i>
                      <p>
                        Administradores
                      </p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/slide" className="nav-link ">
                      <i className="nav-icon fas fa-sliders-h"></i>
                      <p>Gestor Slide</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/gallery" className="nav-link">
                      <i className="fas fa-images nav-icon"></i>
                      <p>Gestor Galeria</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/articles" className="nav-link">
                      <i className="fas fa-file nav-icon"></i>
                      <p>Gestor Articulos</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/users" className="nav-link">
                      <i className="fas fa-users nav-icon"></i>
                      <p>Usuarios</p>
                    </a>
                  </li>
            </ul>
          </nav>
        </div>
      </aside>
    </Fragment>
  );
}


const getAdmin = () => {
  return localStorage.getItem('USUARIO');
}
