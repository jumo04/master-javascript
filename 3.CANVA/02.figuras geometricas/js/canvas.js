var canvas = document.querySelector("#lienzo");
var ctx = canvas.getContext('2d');//nos retorna un contexto de dibujo en el lienzo o null si el idenfiticador del contexto no esta soportado.

/*=============================================
=            CUADROS            =
=============================================*/


//contorno
ctx.lineWidth = 5;
ctx.strokeStyle='rgba(255,0,255,1)';
ctx.rect(10, 10, 500, 100);
ctx.stroke();

ctx.rect(200, 300, 10, 10);
ctx.stroke();

ctx.rect(400, 400, 10, 10);
ctx.stroke();


ctx.fillStyle = "cyan";
//x1,y1,x2,y2
ctx.fillRect(10, 10, 500, 100);



/*=============================================
=            CIRCULO            =
=============================================*/

ctx.beginPath();
// ctx.arc(x, y, radius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle, anticlockwise);
ctx.arc(300, 300, 80, 0, 2*Math.PI);


ctx.fillStyle = 'green';
ctx.fill();


//contorno
ctx.lineWidth = 5;
ctx.strokeStyle='purple';
ctx.stroke();

/*=============================================
=        LINEAS          =
=============================================*/

ctx.beginPath();
ctx.moveTo(0,0);

ctx.lineTo(200, 200);
ctx.lineTo(400, 200);
ctx.lineTo(600, 400);
ctx.lineTo(800, 200);
ctx.lineTo(1000, 200);
ctx.lineTo(1000, 0);

ctx.lineWidth = 5;
ctx.stroke();

//rellenar
ctx.fillStyle = "rgba(0,0,255,0.6)";
ctx.fill();


/*=============================================
=        CURVAS          =
=============================================*/

ctx.beginPath();
ctx.moveTo(0,500);

// context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
ctx.bezierCurveTo(200, 300, 400, 400, 500, 500);

ctx.lineWidth = 5;
ctx.strokeStyle='purple';
ctx.stroke();



/*=============================================
=        DEGRADADOS          =
=============================================*/

var grd = ctx.createLinearGradient(0, 300, 0, 400);
grd.addColorStop(0, 'red');
grd.addColorStop(1, 'yellow');
ctx.fillStyle = grd;
ctx.fillRect(0,300,100,100);



var grd2 = ctx.createRadialGradient(890,350,5,900,350,120);
grd2.addColorStop(0, 'white');
grd2.addColorStop(1, 'black');
ctx.beginPath();
ctx.arc(900,400,100,0,7);
ctx.fillStyle = grd2;
ctx.fill(); 