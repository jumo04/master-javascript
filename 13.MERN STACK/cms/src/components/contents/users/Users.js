import React from "react";
import { Config } from "../../../config/Config";
import "datatables.net"; //datatable basico
import "datatables.net-bs4"; //para mejorar los estulos
import "datatables.net-responsive"; //con este import mejoramos los datatables en pantallas pequeñas
import $ from "jquery";

export default function Users() {

  const dataUsers = async () => {
    const response = await getUsers();
    let dataSet = [];

    if (response.status !== 200) {
    }else{
      response.users.forEach((user, index) => {
         dataSet[index] = [ 
          (index + 1),
          user.username,
          user.email,
        ];
      });
    } 

  // Ejecutamos el Datatable
  $(document).ready(function () {
    let tableUser = $(".table").DataTable({
      data: dataSet,

      columnDefs: [{
        searchable: true,
        targets: 0,
        orderable: true
      }],

      order: [[0, "desc"]],
      columns: [
        { title: "#" },
        { title: "Usuario" },
        { title: "Email"},
       
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

    tableUser.on("order.dt search.dt", function () {
      tableUser
        .column(0, { search: "applied", order: "applied" })
        .nodes()
        .each(function (cell, i) {
          cell.innerHTML = i + 1;
        });
    }).draw();
  });

}

dataUsers();

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Usuarios</h1>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <button className="btn btn-primary float-right">
                      Crear nuevo usuario
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
    </div>
  );
}


const getUsers = async () => {
  const url = `${Config.API_URL}/user/mostrar`;
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
