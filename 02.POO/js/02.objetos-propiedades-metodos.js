/*************************************************************
 * OBJETOS: es una coleccion de propiedades y metodos
 ************************************************************/

var object = {

    // Es una asociacion entre un nombre y un valor
    nombre: "Juan",
    edad: 31,

    //El metodo es una funcion dentro de un objeto.

    description: function () {
        console.log("su nombre es"+ object.nombre + " y tiene " + object.edad);
    },

    saludar: function(saludo) {
        console.log(saludo + " " +object.nombre);
    }
}
console.log("Nombre", object.nombre);
object.description();
object.saludar("Hola");

/****************************************************
 * OBJETOS PRIMITIVOS: son objetos que no necesitan definirse con New y que componen a objetos que componen a javascript, por ejemplo string, number, boolean, 
 *****************************************************/

var d = new Date(); 

console.log(d);
var y = d.getFullYear();
console.log(y);