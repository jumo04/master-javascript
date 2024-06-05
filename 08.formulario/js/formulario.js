
/*=============================================
       OBJETO PROPIEDADES FGORMULARIO
=============================================*/


var pf = {
    entradas: document.querySelectorAll("input.validar"),
    valor: null,
    exRegular: null,
    validarUsuario: false,
    validarPassword: false,
    validarEmail: false,
    validarTerminos: null
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
        e.preventDefault();
        pf.valor = e.target.value;

        if (pf.valor != "") {
         
         switch (e.target.id) {
            case "nombre":
               if (pf.valor.length < 2 || pf.valor.length > 6) {
                
                 document.querySelector("[for=" + e.target.id + "] .error").innerHTML = '<span style="color: red"> Error al ingresar los datos:' + e.target.placeholder +' </span>';
                 pf.validarUsuario = false; 
                
                }else{
                document.querySelector("[for=" + e.target.id + "] .error").parentNode.removeChild(document.querySelector("[for=" + e.target.id + "] .error"));
                pf.validarUsuario = true; 
               }
            break;

            case "password":
               pf.exRegular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
               if (!(pf.exRegular.test( e.target.value))) {
                document.querySelector("[for=" + e.target.id + "] .error").innerHTML = '<span style="color: red"> Error al ingresar los datos:' + e.target.placeholder +' </span>';
                pf.validarPassword = false; 
               
                }else{
                document.querySelector("[for=" + e.target.id + "] .error").parentNode.removeChild(document.querySelector("[for=" + e.target.id + "] .error"));
                pf.validarPassword = true; 

               }
            break;

            case "email":
                
                pf.exRegular = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

                if (!pf.exRegular.test(e.target.value)) {
                 document.querySelector("[for=" + e.target.id + "] .error").innerHTML = '<span style="color: red"> Error al ingresar los datos:' + e.target.placeholder +' </span>';
                 pf.validarEmail = false; 
                
                }else{
                document.querySelector("[for=" + e.target.id + "] .error").parentNode.removeChild(document.querySelector("[for=" + e.target.id + "] .error"));
                pf.validarEmail = true; 
                }
            break;
         }   
        }else{
            document.querySelector("[for=" + e.target.id + "] .error").parentNode.removeChild(document.querySelector("[for=" + e.target.id + "] .error"));

        }
    },

    validarFormulario: function () {
        pf.validarTerminos = document.querySelector("#terminos").checked;
        if (!pf.validarUsuario || !pf.validarPassword || !pf.validarEmail) {

            document.querySelector("#labelEnviar").innerHTML = '<span style="color: red">*Tiene errores en los datos que ha ingresado, favor revisar de nuevo!</span>'
            return false;
            
        }else if(!pf.validarTerminos){
            document.querySelector("#labelEnviar").innerHTML = '<span style="color: red">*Acepte terminos y condiciones!</span>'
            return false;
        }else{
            return true;
        }

    }
}



mf.inicioFormulario();

