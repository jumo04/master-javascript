/** CONDICIONES Y CAMBIOS */
var a = 15;
var b = 15;
 
if (a < b) {
    console.log("a es mayor que b")    
}else if(a == b){
    console.log("a es lo mismo que b")
}else{
    console.log("a no el mismo que b, es menor que b")
}



/** CAMBIOS */
var dia = "lunes";

switch(dia){
    case "sabado":
        console.log("HOY ESTAMOS A SABADO");
    break;
    case "jueves":
        console.log("voy a desarrollar en php")
    break;
    case "miercoles":
        console.log("voy a tatuar")
    break;
    case "martes":
        console.log("voy a desarrollar en node js ");
    break;
    case "domingo":
        console.log("voy a descansar");
    break;

    default: console.log("yo ya se javascript");
}
