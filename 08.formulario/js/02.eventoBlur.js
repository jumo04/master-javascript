
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
            pf.entradas[i].addEventListener("blur", mf.fueraFoco);
            pf.entradas[i].addEventListener("blur", mf.cambioEntrada);
        }
    },

    foco: function (e) {
        pf.valor = e.target.value;

        if (pf.valor == "") {
            document.querySelector("#" + e.target.id ).style.background = "rgba(255,0,0,.5)";

            document.querySelector("[for=" + e.target.id + "] .obligatorio").style.opacity = 1;
        }

        document.querySelector("[for=" + e.target.id + "]").appendChild(document.createElement("DIV")).setAttribute("class", "error");

    },

    fueraFoco: function (e) {
        document.querySelector("#" + e.target.id ).style.background = "white";
        document.querySelector("[for=" + e.target.id + "] .obligatorio").style.opacity = 0;
    },
    
    cambioEntrada: function (e) {
        pf.valor = e.target.value;

        if (pf.valor != "") {
         
         switch (e.target.id) {
            case "nombre":
               if (pf.valor.length > 2 || pf.valor.length < 6) {
                
                 document.querySelector("[for=" + e.target.id + "] .error").innerHTML = '<span style="color: red"> Error al ingresar los datos:' + e.target.value +' </span>'
               } 
            break;

            case "password":
                
            break;

            case "email":
                
            break;
            default:
                break;
         }   
        }
    }
}



mf.inicioFormulario();

