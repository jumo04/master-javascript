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
    height: 10
};

/*=============================================
= PROPIEDADES DEL OBJETO LABERINTO =
=============================================*/


var bloques = [{x: 300, y:50, ancho: 400, alto: 10, color: "black"},
               {x: 300, y:90, ancho: 10, alto: 360},
               {x: 300, y:440, ancho: 400, alto: 10},
               {x: 690, y:90, ancho: 10, alto: 360}, 
               {x: 365, y:50, ancho: 10, alto: 350},
               {x: 430, y:100, ancho: 10, alto: 350},
               {x: 495, y:50, ancho: 10, alto: 350},
               {x: 560, y:100, ancho: 10, alto: 350},
               {x: 625, y:50, ancho: 10, alto: 350}]




var juego = {
    
    tiempo: function () {
        juego.canvas();
        frame(juego.tiempo);
    },

    canvas: function() {
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
    }

}

juego.tiempo();
/*=============================================
=  CANVAS   =
=============================================*/


context.fillStyle= jugador.color;
context.fillRect(jugador.x, jugador.y, jugador.width, jugador.height);

context.fillStyle= bloques[0].color;

for (let i = 0; i < bloques.length; i++) {
    context.fillRect(bloques[i].x, bloques[i].y, bloques[i].ancho, bloques[i].alto);
}





