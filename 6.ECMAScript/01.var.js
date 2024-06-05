
console.log("### VAR ####");
//delcaracion var se utiliza para declarar variables globales, se puede reutilizar en diferentes contextos
// y puede ser transformado su valor en cualquier momento

var nombre_var= "Juan";

if (nombre_var == 'Juan') {

    var edad_var = 30;
    nombre_var = 'Miguel';
}

console.log(nombre_var);
console.log(edad_var);

console.log("### LET ####");

//Declaracion let: se utiliza para declarar variables en cotextos especificos y pueden cambiar su valor en dicho cotexto
// se destruye fuera del contexto para ahorrar memoria en el navegador

let nombre_let= "Juan";
if (nombre_let == 'Juan') {

    let edad_let = 30;
    let nombre_let = 'Miguel';
    console.log("nombre let", nombre_let);

}

console.log("nombre let", nombre_let);
// console.log("edad let", edad_let);

console.log("### CONST ####");

// Declaracion const: es una variable que no se puede modificar, pasa un error si se modifica, solo es para contextos especificos
// solo se utiliza para declarar variables constantes en contextos especificos es decir no se puede cambiar su valor en dicho contexto
// por lo tanto ahorra memoria porque se destruye fuera del contexto ahorrando memoria

const nombre_const= "Juan";
if (nombre_const == 'Juan') {

    // const edad_const = 30;
    // const nombre_let = 'Miguel';
    // console.log("nombre let", nombre_let);

}

console.log("nombre conts", nombre_const);
// console.log("edad let", edad_let);
