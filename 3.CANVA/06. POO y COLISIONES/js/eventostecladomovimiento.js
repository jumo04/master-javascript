var canvas = document.querySelector("#lienzo");
var context = canvas.getContext('2d');


/*=============================================
= ANIMACION REQUESTANIMATIONFRAME =
=============================================*/

var frame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;

/*=============================================
= PROPIEDADES DEL OBJETO JUGADOR =
=============================================*/

// var obj =  new Object({
//     color: "red",
//     x: 280,
//     y: 70, 
//     width: 10,
//     height: 10,
//     method: function () {
//         obj.x = 10;
//     }
// });

var jugador = {
    color: "red",
    x: 280,
    y: 70, 
    width: 10,
    height: 10,
    movimientoX: 0,
    movimientoY: 0,
    speed: 5, 
    x1: null,
    x2: null,
    y1: null,
    y2: null
};

/*=============================================
= PROPIEDADES DEL OBJETO LABERINTO =
=============================================*/


var bloques = [{x: 300, y:50, ancho: 400, alto: 10, x1: null, x2: null, y1: null, y2:null, color: "black"},
               {x: 300, y:90, ancho: 10, alto: 360, x1: null, x2: null, y1: null, y2:null},
               {x: 300, y:440, ancho: 400, alto: 10, x1: null, x2: null, y1: null, y2:null},
               {x: 690, y:90, ancho: 10, alto: 360, x1: null, x2: null, y1: null, y2:null}, 
               {x: 365, y:50, ancho: 10, alto: 350, x1: null, x2: null, y1: null, y2:null},
               {x: 430, y:100, ancho: 10, alto: 350, x1: null, x2: null, y1: null, y2:null},
               {x: 495, y:50, ancho: 10, alto: 350, x1: null, x2: null, y1: null, y2:null},
               {x: 560, y:100, ancho: 10, alto: 350, x1: null, x2: null, y1: null, y2:null},
               {x: 625, y:50, ancho: 10, alto: 350, x1: null, x2: null, y1: null, y2:null}]




var datos={
    izquierda: false,
    derecha: false,
    arriba: false,
    abajo: false
}

var juego = {

    teclado: function () {
      
      /*=============================================
      =  EVENTO TECLADO   =
      =============================================*/
      
      document.addEventListener("keydown", juego.oprimir);
      document.addEventListener("keyup", juego.soltar);
    },

    oprimir: function (tecla) {
        tecla.preventDefault();

        switch (tecla.keyCode) {
            case 37:
             datos.izquierda = true;
            break;
            case 38:
             datos.arriba = true;
            break;
            case 39:
             datos.derecha = true;
            break;
            case 40:
             datos.abajo = true;
            break;
        }
    },

    soltar: function (tecla) {
        tecla.preventDefault();
        switch (tecla.keyCode) {
            case 37:
             datos.izquierda = false;
            break;
            case 38:
             datos.arriba = false;
            break;
            case 39:
             datos.derecha = false;
            break;
            case 40:
             datos.abajo = false;
            break;
        }
    },
    
    tiempo: function () {
        
        /*=============================================
        =  MOVIMIENTO HORIZONTAL JUGADOR  =
        =============================================*/
        
        jugador.x += jugador.movimientoX;
        if (datos.izquierda ) {jugador.movimientoX = -jugador.speed; jugador.movimientoY = 0;}
        if (datos.derecha ) {jugador.movimientoX = jugador.speed; jugador.movimientoY = 0;}
        if (!datos.izquierda  && !datos.derecha ) {jugador.movimientoX = 0;}

        /*=============================================
        =  MOVIMIENTO HORIZONTAL JUGADOR  =
        =============================================*/
        
        jugador.y += jugador.movimientoY;
        if (datos.arriba ) {jugador.movimientoY = -jugador.speed; jugador.movimientoX = 0;}
        if (datos.abajo ) {jugador.movimientoY = jugador.speed; jugador.movimientoX = 0;}
        if (!datos.arriba  && !datos.abajo ) {jugador.movimientoY = 0;}

        /*=============================================
        =        CANVAS            =
        =============================================*/
        
        juego.canvas();

        frame(juego.tiempo);
    },

    canvas: function() {

        /*=============================================
        =        CANVAS            =
        =============================================*/

        //BORRAR LIENZO
        context.clearRect(0, 0, canvas.width, canvas.height);

        //DIBUJAR JUGADOR

        context.fillStyle= jugador.color;
        context.fillRect(jugador.x, jugador.y, jugador.width, jugador.height);

        //DIBUJAR BLOQUES

        context.fillStyle= bloques[0].color;

        for (let i = 0; i < bloques.length; i++) {
            context.fillRect(bloques[i].x, bloques[i].y, bloques[i].ancho, bloques[i].alto);
        }

    }

}
juego.teclado();
juego.tiempo();
/*=============================================
=  CANVAS   =
=============================================*/







