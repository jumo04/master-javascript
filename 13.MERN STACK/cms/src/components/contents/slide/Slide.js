import React from "react";

import { Config } from "../../../config/Config";

import 'datatables.net';//datatable basico
import 'datatables.net-bs4';//para mejorar los estilos
import 'datatables.net-responsive';//con este import mejoramos los datatables en pantallas pequeñas
import $ from 'jquery';
import  CreateSlide  from "./CreateSlide";
import EditDeleteSlide  from "./EditDeleteSlide";

export default function Slide() {

  // Cargamos los datos de la base de datos
  const dataSlide = async () => {
    const response = await getSlides();
    const dataSet = [];

    if (response.status !== 200) {
    }else{
      response.slides.forEach((slide, index) => {
         dataSet[index] = [
          (index + 1),
          slide.imagen,
          slide.titulo,
          slide.descripcion,
         [slide._id+"_", slide.imagen+"_", slide.titulo+"_", slide.descripcion],
        ];
      });
    }

  // Ejecutamos el Datatable
  $(document).ready(function () {
    let tablaSlide = $(".table").DataTable({
      data: dataSet,
      columnDefs: [{
        targets: 0,
        searchable: true,
        orderable: true
      }],
      order: [[0, "desc"]],
      columns: [
        { title: "#" },
        { title: "Imagen", 
        render: function (data) {
          return `<img src="${Config.API_URL}/slide/mostrar/${data}" style="width:320px;"  alt=""/>`;
         },
         width: "320px"
        },        
        { title: "Titulo" },
        { title: "Descripcion" },
        {
          title: "Acciones",
          render: function (data) {
            return `
							<a href="" class="editarSlide" data-toggle="modal" data-target="#editSlide" data="${data}">
								<svg style="color:black; background:orange; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:8px"
								aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" class="svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
							</a>
							<a href="" class="borrarSlide" data="${data}">
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
    tablaSlide.on( 'order.dt search.dt', function () {
      tablaSlide.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
        cell.innerHTML = i+1;
      });
    }).draw();
  });
  }
  dataSlide();

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Slide</h1>
            </div>
          </div>
        </div>        
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <button className="btn btn-primary float-right"  data-toggle="modal" data-target="#createSlide">Crear nuevo slide</button>
                  </div>
                  <div className="card-body">
                    <table className="table table-striped table-bordered dt-responsive" style={{"width": "100%"}}>
                    
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateSlide />
      <EditDeleteSlide />
    </div>
  );
}


const getSlides = () => { 
  const url = `${Config.API_URL}/slide/mostrar`;
  const token = localStorage.getItem("ACCESS_TOKEN");

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
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

