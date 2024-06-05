let vehiculos =[{
    id: 1,
    marca: "Mazda",
    modelo: 2016
},{
    id: 2,
    marca: "Toyota",
    modelo: 2017
},{
    id: 3,
    marca: "Hyundai",
    modelo: 2018
}]


console.log("##### FILTER() #####");

// Filtrar un objeto en un array, recorre cada elemento del array y retorna un nuevo array con las condiciones que yo le dicte
// Esta filtrando los elementos solicitados, DEVUELVE ARRAYS

let filter_vehiculos = vehiculos.filter(vehiculo => {
    return vehiculo.modelo > 2016
});

console.log(filter_vehiculos);

console.log("##### FIND() #####");

// Solo me va a retornar la primera coincidencia que encuentre de acuerdo a la condicion que le dicte en el filtro
// DEVUELVE SOLO UN OBJETO
let buscar_vehiculo = vehiculos.find(vehiculo => {
    return vehiculo.id === 1
})

console.log(buscar_vehiculo);