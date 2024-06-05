import React from "react";

import { Config } from "../../../config/Config";

import "datatables.net"; //datatable basico
import "datatables.net-bs4"; //para mejorar los estulos
import "datatables.net-responsive"; //con este import mejoramos los datatables en pantallas pequeñas
import $ from "jquery";
import CreateDeleteGallery from "./CreateDeleteGallery";

export default function Gallery() {

  const dataGallery = async () => {
    const response = await getGalleries();
    let dataSet = [];

    if (response.status !== 200) {
    }else{
      response.galleries.forEach((gallery, index) => {
         dataSet[index] = [ 
          (index + 1),
          gallery.foto,
          [gallery._id],
        ];
      });
    }
    // Ejecutamos el Datatable
    $(document).ready(function () {
      $(".table").DataTable({
        data: dataSet,
        columns: [
          { title: "#" },
          { title: "Foto", 
          render: function (data) {
            return `<img src="${Config.API_URL}/gallery/mostrar/${data}" width="320px" alt=""/>`;
           },
           width: "320px"
          },
  
          {
            title: "Acciones",
            render: function (data) {
              return `
                <a href="" class="borrarFoto" data="${data}">
                  <svg style="color:white; background:#dc3545; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:10px"
                  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                </a>`;
            },
          },
        ],
        "language": {
  
          "sProcessing":     "Procesando...",
          "sLengthMenu":     "Mostrar _MENU_ registros",
          "sZeroRecords":    "No se encontraron resultados",
          "sEmptyTable":     "Ningún dato disponible en esta tabla",
          "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
          "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
          "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
          "sInfoPostFix":    "",
          "sSearch":         "Buscar:",
          "sUrl":            "",
          "sInfoThousands":  ",",
          "sLoadingRecords": "Cargando...",
          "oPaginate": {
              "sFirst":    "Primero",
              "sLast":     "Último",
              "sNext":     "Siguiente",
              "sPrevious": "Anterior"
          },
          "oAria": {
                  "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                  "sSortDescending": ": Activar para ordenar la columna de manera descendente"
          }
  
      },
      bDestroy: true
      });
    });
  }
 
  dataGallery();

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Galeria</h1>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <button className="btn btn-primary float-right cleanForm" data-toggle="modal" data-target="#createGallery">
                      Crear nueva foto
                    </button>
                  </div>
                  <div className="card-body">
                    <table
                      className="table table-striped table-bordered dt-responsive"
                      style={{ width: "100%" }}
                    >
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateDeleteGallery />
    </div>
  );
}

const getGalleries = () => {
  const url = `${Config.API_URL}/gallery/mostrar`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  };
  return fetch(url, params).then(response => {
    return response.json();
  }).then(result => {
    return result;
  }).catch(err => {
    return err;
  });
  
}
