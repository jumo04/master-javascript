var recuadro = document.querySelector("#recuadro");

/** EVENTOS DEL DOM */
function cambiarColor() {

    recuadro.style.background = "red";
    recuadro.style.transition = "1s background ease";

}


// var boton = document.querySelector("#boton");

// boton.addEventListener("click", moverCaja);

function moverCaja() {
    
    recuadro.style.width = "500px";
    recuadro.style.transition = "1s width ease";
}