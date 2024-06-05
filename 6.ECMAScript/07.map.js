console.log("##### MAP #####");
// Recorre cada elemento del array y retorna el elemento modificado con las modificaciones que se quieran agregar


let deportes =[{
        titulo: "Futbol",
        nivel: "Basico"
    },{
        titulo: "Tennis",
        nivel: "Intermedio"
    },{
        titulo: "Golf",
        nivel: "Avanzado"
    }]

deportes.map((deporte, index)=> {
    if (index === 1) {
        deporte.lugar = "Estadio";
    }

    if (index === 2) {
        deporte.nivel = "Basico";
    }
    return deporte;
})

console.log("Deportes:", deportes);