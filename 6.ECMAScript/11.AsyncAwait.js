console.log("##### PROMISES() #####");

// Nos siemplifica el codigo para ejecutar respuestas asincronas con una unica respuesta verdadera

let reserva_destino = [
  {
    id: 1,
    destino: "Miami",
  },
  {
    id: 2,
    destino: "New York",
  },
  {
    id: 3,
    destino: "Los Angeles",
  },
];

let reserva_dia = [
  {
    id: 1,
    dia: "Lunes",
  },
  {
    id: 2,
    dia: "Martes",
  },
  {
    id: 3,
    dia: "Miercoles",
  },
];

let reserva_asiento = [
  {
    id: 1,
    asiento: "Ventana",
  },
  {
    id: 2,
    asiento: "Medio",
  },
  {
    id: 3,
    asiento: "Pasillo",
  },
];

// Primera tarea: servervar el destino

let get_destino = (id) => {
  return new Promise((resolve, reject) => {
    let destinoDB = reserva_destino.find((destino) => destino.id === id);
    if (!destinoDB) {
      reject("No existe el destino seleccionado");
    } else {
      resolve(destinoDB);
    }
  });
};

// Segunda tarea: servervar el dia

let get_dia = (id) => {
  return new Promise((resolve, reject) => {
    let diaDB = reserva_dia.find((dia) => dia.id === id);
    if (!diaDB) {
      reject("No existe el dia seleccionado");
    } else {
      resolve(diaDB);
    }
  });
};

// Tercera tarea: servervar el dia

let get_asiento = (id) => {
  return new Promise((resolve, reject) => {
    let asientoDB = reserva_asiento.find((asiento) => asiento.id === id);
    if (!asientoDB) {
      reject("No existe el asiento seleccionado");
    } else {
      resolve(asientoDB);
    }
  });
};

// Respuestas de las tareas asincronas con async await

let informe_reserva = async (idDestino, idDia, idAsiento) => {
  try {
    let destino_info = await get_destino(idDestino);
    let dia_info = await get_dia(idDia);
    let asiento_info = await get_asiento(idAsiento);

    return `tu destino sera: ${destino_info.destino}, tu dia sera: ${dia_info.dia}, tu asiento sera: ${asiento_info.asiento} `;
  } catch (error) {}
};

informe_reserva(1, 2, 3)
  .then((mensaje) => console.log(mensaje))
  .catch((err) => console.log(err));
