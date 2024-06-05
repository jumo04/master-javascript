
/*=============================================
       OBJETO PROPIEDADES FGORMULARIO
=============================================*/


var pf = {
    entradas: document.querySelectorAll("input.validar"),
    valor: null
}


/*=============================================
=     METODOS FORMULARIO     =
=============================================*/


var mf = {
    inicioFormulario: function () {
        for (let i = 0; i< pf.entradas.length; i++) {
            pf.entradas[i].addEventListener("focus", mf.foco);
        }
    },

    foco: function (e) {
        pf.valor = e.target.value;

        if (pf.valor == "") {
            document.querySelector("#" + e.target.id ).style.background = "rgba(255,0,0,.5)";

            document.querySelector("[for=" + e.target.id + "] .obligatorio").style.opacity = 1;
        }
    }
}


mf.inicioFormulario();

