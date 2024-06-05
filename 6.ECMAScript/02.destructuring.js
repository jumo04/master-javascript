console.log("###  DESTRUCTURING  ###");

// Nos permite tomar los valores de las propiedades de un objeto de forma directa, utilizando el mismo nombre de la propiedad

let carro = {
    marca: "Ferrari",
    modelo: 2020,
    color: "Rojo"
}

const {marca, modelo, color} = carro;


let propiedades = "color";

console.log("carro", carro[propiedades]);

// Imprimiendo el destrucuring modelo
console.log("carro", modelo);
