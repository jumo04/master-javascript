/** FOR LOOP */
var cajas = document.querySelectorAll(".cajas");
console.log("cajas", cajas);

cajas[0].style.width = "50px";
cajas[0].style.height = "50px";
cajas[0].style.background = "blue";

for (let i = 0; i < cajas.length; i++) {

    cajas[i].style.width = "50px";
    cajas[i].style.height = "50px";
    cajas[i].style.background = "blue";
    cajas[i].style.marginTop = "20px";
    cajas[i].style.display = "inline-block";
    
}


for(var i = 1; i <= 5 ; i++){
    console.log("i", i);
}

/** WHILE LOOP*/
var n = 1;

while(n <= 5){
    console.log("n", n);
    n++;
}


/** DO WHILE LOOP */
var p = 1;

do{
    console.log("p", p);
    p++;
}
while(p <= 5);
