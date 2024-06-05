console.log("### IF TERNARIO ###");

// Sirve para hacer comprobaciones en una sola linea de codigo de falso y verdadero
let camisa = {
    talla: 34,
    cantidad: 0,
    existencia: false
}

const {talla, cantidad, existencia} = camisa;
let respuesta;



existencia ? respuesta = "Hay "+cantidad+" camisas" : respuesta = "No hay camisas";

console.log(respuesta);