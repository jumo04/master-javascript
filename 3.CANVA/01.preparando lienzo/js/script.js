
/*=============================================
=  OBJETO CON LAS PROPIEDADES   =
=============================================*/

var pc = {
    contenedor: document.querySelector(".contenedor"),
    ampliarLienzo: document.querySelector("#lienzo"),
    btnAmpliar: document.querySelector("#btn-ampliar")
}


/*===============================================
= OBJETO CON LOS METODOS O FUNCIONES DEL CANVAS =
=================================================*/


var fc = {
    inicio: function () {
        pc.btnAmpliar.addEventListener("click", fc.ampliar);
    },   

    ampliar: function () {
        pc.contenedor.style.width = "100%";
        pc.contenedor.style.height = "100vh";
        pc.contenedor.style.margin = "0";
        
        pc.ampliarLienzo.style.width = "100%";
        pc.ampliarLienzo.style.height = "100vh";
        pc.ampliarLienzo.style.backgroundSize = "cover";
        pc.ampliarLienzo.style.backgroundRepeat = "no-repeat";

        pc.btnAmpliar.innerHTML = "Reducir Canvas";
        pc.btnAmpliar.style.position = "fixed";
        pc.btnAmpliar.style.top = "10px";
        pc.btnAmpliar.style.left = "10px";
        pc.btnAmpliar.style.zIndex = "1";

        pc.btnAmpliar.removeEventListener("click", fc.ampliar);
        pc.btnAmpliar.addEventListener("click", fc.reducir);
    },

    reducir: function () {
        pc.contenedor.style.width = "1000px";
        pc.contenedor.style.height = "500px";
        pc.contenedor.style.margin = "5vh auto";
        
        pc.ampliarLienzo.style.width = "1000px";
        pc.ampliarLienzo.style.height = "500px";

        pc.btnAmpliar.innerHTML = "Ampliar";
        pc.btnAmpliar.style.position = "relative";
        pc.btnAmpliar.style.top = "0";
        pc.btnAmpliar.style.left = "0";
        pc.btnAmpliar.style.zIndex = "0";

        pc.btnAmpliar.removeEventListener("click", fc.reducir);
        pc.btnAmpliar.addEventListener("click", fc.ampliar);

    }
}

fc.inicio();