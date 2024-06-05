var canvas = document.querySelector("#lienzo");
var ctx = canvas.getContext('2d');


var imgJPG = new Image();
imgJPG.src = "img/ejemploJPG.jpg"

imgJPG.onload = function () {
    ctx.drawImage(imgJPG, 100, 100, imgJPG.naturalWidth/2, imgJPG.naturalHeight/2);
}



var imgPNG = new Image();
imgPNG.src = "img/ejemploPNG.png"

imgPNG.onload = function () {
    ctx.drawImage(imgPNG, 400, 100, imgPNG.naturalWidth/2, imgPNG.naturalHeight/2);
}



var imgSVG = new Image();
imgSVG.src = "img/ejemploSVG.svg"

imgSVG.onload = function () {
    ctx.drawImage(imgSVG, 700, 100, imgSVG.naturalWidth/2, imgSVG.naturalHeight/2);
}

