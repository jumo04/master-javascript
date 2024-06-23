/** FUNCIONES SIN PARAMETROS **/
//Declaramos la funcion
function saludo(){

    //Lo que se va a ejecutar
    console.log("hola");
}

//Ejecutamos la funcion
saludo();

function operacion(digito1, digito2){

    var resultado = digito1 + digito2;
    console.log("resultado", resultado);
}

operacion(5, 7);



/** FUNCIONES CON RETORNO Y SIN PARAMETROS */
function retorno(){
    var number = 5;
    return number;
}



