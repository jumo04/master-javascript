console.log("###  AWWOR FUNCTIONS ###");

// funcion normal

function holaMundo1() {
    console.log("hola mundo");
}

holaMundo1();


// Son funciones anonimas y se deben de guardar en variables constantes o de tipo let. para no ser modificadas en el resto del codigo

const holaMundo = () =>{
    console.log("hola mundo tipo flecha");
}

holaMundo();

// Tipo flecha con parametros
const holaMundoParam = mensaje =>{
    console.log(mensaje);
}

holaMundoParam("Hola mundo tipo flecha  con un parametro");

// Tipo flecha con parametros con mas de un parametro se debe de usar parentesis
const holaMundoParams = (mensaje1, mensaje2) =>{
    console.log(mensaje1, mensaje2);
}

holaMundoParams("Hola mundo con parametro", "mas un segundo parametro");
