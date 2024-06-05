var frame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;

var canvas =  document.querySelector("#lienzo");
var ctx = canvas.getContext('2d');

var numero = 0;
var ubicacionX = 0;
var animacion;


var sprite = new Image();
sprite.src = 'img/opcion1.png'

// sprite.onload = function() {
// //    context.drawImage(imagen, posicion en x, posicion en Y, dWidth, dHeight);
//     ctx.drawImage(sprite, 100, 0, 100, 100, 0, 100, 100, 100);
// }

// requestAnimationFrame
// esta funcion optimiza el uso de informacion, actualizandose de forma automatica tan pronto el cpu le permite, 60 cuadros por segundo
// mejorando la capacidad del manejo de informacion en animaciones, consumiendo menos recursos e incluso mandando a dormir el ciclo cuando la aplicacion deja de tener enfoque dando como resultado un mejor manejo de las animaciones


function tiempo() {

    if (numero >= 600) {
        numero = 0;
    }else{
        numero+= 20;
    }
    for (let i = 0; i <= numero; i+=100) {
        if (numero >= i) {ubicacionX = i}
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite, ubicacionX, 0, 100, 100, 0, 100, 100, 100);

    animacion = frame(tiempo);
}

tiempo();

setTimeout(function () {
    cancelAnimationFrame(animacion);
}, 3000)