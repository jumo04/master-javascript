var tiempo = document.querySelector("#tiempo");
var segundos = 0;



/*** SET INTERVAL (Intervalo de tiempo) */
setInterval(() => {
    segundos ++;
    tiempo.innerHTML = segundos;
}, 1000);



/*** SET TIMEOUT  (retardo de tiempo)*/

setTimeout(function() {
    alert("Se cumplio el tiempo")
}, 5000)


