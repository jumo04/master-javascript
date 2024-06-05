/*******
 * Ejercicio 1
 *******/

var a = {

    A:0,
    B:0,
    C:0,
    D:0,

    result: function () {
        if (a.C>a.B && 
            a.D>a.B &&
            a.D>a.C &&
            a.D<a.A) {

            return true;
        }
        return false;
    },
    interval: setInterval(function () {

        a.A = Math.ceil(Math.random()*4);
        a.B = Math.ceil(Math.random()*4);
        a.C = Math.ceil(Math.random()*4);
        a.D = Math.ceil(Math.random()*4);

        if(a.result()){
            clearInterval(a.interval);
            console.log("atleta A", a.A);
            console.log("atleta B", a.B);
            console.log("atleta C", a.C);
            console.log("atleta D", a.D);
        }
    }, 10)
}


/***************************************
 * EJERCICIO 2

tengo 4 caballos
         | edad   | velocidad | tono
 Mac:     viejo(2)  rapido(2)  oscuro(2)
 Smith:   joven(1)  rapido(2)   claro(1)  
 Jack:    joven(1)  lento(1)   oscuro(2)
 Willy:   joven(1)  rapido(2)  oscuro(2)
***************************************/


var b = {

    Mac: {age: 0, speed: 0, tono: 0 },
    Jack: {age: 0, speed: 0, tono: 0 },
    Smith: {age: 0, speed: 0, tono: 0 },
    Willy: {age: 0, speed: 0, tono: 0 },
    result: function () {
        if(b.Mac.tono > b.Smith.tono &&
            b.Mac.speed > b.Jack.speed &&
            b.Mac.age > b.Jack.age &&
            b.Jack.speed < b.Willy.speed &&
            b.Mac.age > b.Willy.age &&
            b.Mac.age > b.Smith.age &&
            b.Willy.tono > b.Smith.tono &&
            b.Smith.speed > b.Jack.speed &&
            b.Jack.tono > b.Smith.tono){
                return true;

            }

            return false;
    },
    intervalo: setInterval(function () {
       
       b.Mac.tono = Math.ceil(Math.random()*2);
       b.Mac.speed = Math.ceil(Math.random()*2);
       b.Mac.age= Math.ceil(Math.random()*2);

       b.Smith.tono = Math.ceil(Math.random()*2);
       b.Smith.speed = Math.ceil(Math.random()*2);
       b.Smith.age = Math.ceil(Math.random()*2);

       b.Jack.tono = Math.ceil(Math.random()*2);
       b.Jack.speed = Math.ceil(Math.random()*2);
       b.Jack.age = Math.ceil(Math.random()*2);

       b.Willy.tono = Math.ceil(Math.random()*2);
       b.Willy.speed = Math.ceil(Math.random()*2);
       b.Willy.age = Math.ceil(Math.random()*2);

        if (b.result()) {

            clearInterval(b.intervalo);
            console.log("Caballo de Mac", b.Mac);
            console.log("Caballo de Smith", b.Smith);
            console.log("Caballo de Jack", b.Jack);
            console.log("Caballo de Willy", b.Willy);
            
        }
    },1)

}

