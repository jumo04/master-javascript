
/*=============================================
=   Objeto con las propiedades   =
=============================================*/

var pb = {

    botonMovil: document.querySelector("#btnMovil span"),
    vistaBotones: false,
    botonera: document.querySelector("nav"),
    botones: document.querySelectorAll("nav ul li a")
}



/*=============================================
= Objeto con los metodos de la botonera movil =
=============================================*/

var mb = {

    iniciMovil: function () {
        pb.botonMovil.addEventListener("click", mb.mostrarBotonera);
        for (let i = 0; i < ps.botonera.length; i++) {
            pb.botones[i].addEventListener('click', mb.ocultarBotonera);
        }
    },

    mostrarBotonera: function () {
        if (!pb.vistaBotones) {
            pb.vistaBotones = true;
            pb.botonera.className = "col-lg-6 col-md-7 col-sm-9 col-xs-12";
        }else{
            pb.botonera.className = "col-lg-6 col-md-7 col-sm-9 col-xs-0";
            pb.vistaBotones = false;
        }
    },

    ocultarBotonera: function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
            pb.vistaBotones = false;
            pb.botonera.className = "col-lg-6 col-md-7 col-sm-9 col-xs-0";
        }
    }
}

mb.iniciMovil();

