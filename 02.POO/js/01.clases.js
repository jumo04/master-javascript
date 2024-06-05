/** CLASES
 * 
 * las clases son funciones constructoras y siempre las vamos a iniciar con mayusculas
 * the class are constructor functions and always been initate with capitalice 
    ejemplo: new String()
 * 
 *
 *     
*/

/***  CLASES PRIMITIVAS  ****/

// clase string

    var string = new String("esto es un string");
    console.log("string" + string);

//clase number
    var number = new Number(12);
    console.log("numer", number);
//clase boolean
    var bolean = new Boolean(false);
    console.log("boolean", bolean)


/***   CLASES COMPUESTAS   ****/

// clase array
var array = new Array("rojo", "verde", "negro");
console.log("array", array);
// clase object
var object = new Object({nombre: "Pedro", edad:30});
console.log("object", object);


/** CLASE CREADAS POR EL PROGRAMADOR **/

function Persona() {

    //Propiedades publicas
    this.nombre;
    this.edad;
    
}

var yo = new Persona();

yo.nombre = "Juan";
yo.edad = 21;

console.log("yo", yo);


function Animals(name, type) {
    this.name = name;
    this.type = type;
}

var animals = new Animals("perro", "husky");
console.log("animals", animals);