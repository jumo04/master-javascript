    var canvas = document.querySelector("#lienzo");
    var context = canvas.getContext('2d');


    var time = document.querySelector("#time span");

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
        y: 55, 
        width: 10,
        height: 10,
        movimientoX: 0,
        movimientoY: 0,
        speed: 3, 
        x1: null,
        x2: null,
        y1: null,
        y2: null
    };

    /*=============================================
    = PROPIEDADES DEL OBJETO LABERINTO =
    =============================================*/
    var bloques = [  { x: 288, y:37.52, ancho:425, alto:9.35, x1: null, x2: null, y1: null, y2:null, color: "black"},
                        { x: 703.65, y:37.521, ancho:9.35, alto:424.999, x1: null, x2: null, y1: null, y2:null},
                        { x:288, y:453.17, ancho:425, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:288.001, y:84.82, ancho:9.35, alto:303.749, x1: null, x2: null, y1: null, y2:null},
                        { x:288.001, y:418.32, ancho:9.35, alto:34.851, x1: null, x2: null, y1: null, y2:null},
                        { x:297.351, y:418.32, ancho:35.955, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:323.956, y:343.144, ancho:9.35, alto:75.175, x1: null, x2: null, y1: null, y2:null},
                        { x:362.467, y:84.82, ancho:9.35, alto:113.802, x1: null, x2: null, y1: null, y2:null},
                        { x:362.467, y:312.723, ancho:9.35, alto:112.884, x1: null, x2: null, y1: null, y2:null},
                        { x:297.351, y:303.373, ancho:110.283, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:448.769, y:303.373, ancho:27.511, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:478.108, y:341.226, ancho:46.21, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:402.559, y:341.226, ancho:46.21, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:629.481, y:341.226, ancho:81.701, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:629.108, y:264.949, ancho:46.21, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:629.108, y:189.688, ancho:46.21, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:590.149, y:228.647, ancho:46.21, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:514.89, y:113.543, ancho:188.761, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:590.785, y:75.47, ancho:83.649, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:486.801, y:151.615, ancho:179.167, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:447.844, y:75.47, ancho:72.994, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:362.467, y:75.47, ancho:46.04, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:288.001, y:75.47, ancho:46.04, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:297.351, y:151.616, ancho:36.691, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:325.188, y:114.43, ancho:37.279, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:324.303, y:189.272, ancho:38.165, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:371.817, y:379.074, ancho:69.098, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:487.125, y:379.074, ancho:64.46, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:439.42, y:303.373, ancho:9.35, alto:37.852, x1: null, x2: null, y1: null, y2:null},
                        { x:440.915, y:379.074, ancho:9.35, alto:36.86, x1: null, x2: null, y1: null, y2:null},
                        { x:551.584, y:191.088, ancho:9.35, alto:224.847, x1: null, x2: null, y1: null, y2:null},
                        { x:477.775, y:379.074, ancho:9.35, alto:36.86, x1: null, x2: null, y1: null, y2:null},
                        { x:400.24, y:414.932, ancho:9.35, alto:38.238, x1: null, x2: null, y1: null, y2:null},
                        { x:513.794, y:414.932, ancho:9.35, alto:38.238, x1: null, x2: null, y1: null, y2:null},
                        { x:628.154, y:389.328, ancho:9.35, alto:71.814, x1: null, x2: null, y1: null, y2:null},
                        { x:666.466, y:350.575, ancho:9.35, alto:74.56, x1: null, x2: null, y1: null, y2:null},
                        { x:514.969, y:160.994, ancho:9.35, alto:180.232, x1: null, x2: null, y1: null, y2:null},
                        { x:590.149, y:228.647, ancho:9.35, alto:46.21, x1: null, x2: null, y1: null, y2:null},
                        { x:629.108, y:189.688, ancho:9.35, alto:48.362, x1: null, x2: null, y1: null, y2:null},
                        { x:665.969, y:151.615, ancho:9.35, alto:38.073, x1: null, x2: null, y1: null, y2:null},
                        { x:665.969, y:228.952, ancho:9.35, alto:83.217, x1: null, x2: null, y1: null, y2:null},
                        { x:476.28, y:200.437, ancho:9.35, alto:112.285, x1: null, x2: null, y1: null, y2:null},
                        { x:437.101, y:152.833, ancho:9.35, alto:114.681, x1: null, x2: null, y1: null, y2:null},
                        { x:400.63, y:124.697, ancho:9.35, alto:112.025, x1: null, x2: null, y1: null, y2:null},
                        { x:591.294, y:304.517, ancho:9.35, alto:75.462, x1: null, x2: null, y1: null, y2:null},
                        { x:600.644, y:304.517, ancho:37.814, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:560.934, y:265.507, ancho:29.215, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:560.934, y:191.088, ancho:36.861, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:446.45, y:191.088, ancho:39.18, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:591.294, y:379.978, ancho:46.21, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:551.584, y:415.934, ancho:46.21, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:440.915, y:415.934, ancho:46.21, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:590.785, y:46.871, ancho:9.35, alto:28.599, x1: null, x2: null, y1: null, y2:null},
                        { x:552.601, y:75.79, ancho:9.35, alto:37.753, x1: null, x2: null, y1: null, y2:null},
                        { x:399.158, y:46.871, ancho:9.35, alto:28.599, x1: null, x2: null, y1: null, y2:null},
                        { x:438.48, y:75.47, ancho:9.35, alto:39.878, x1: null, x2: null, y1: null, y2:null},
                        { x:477.452, y:84.82, ancho:9.35, alto:76.174, x1: null, x2: null, y1: null, y2:null},
                        { x:629.108, y:274.298, ancho:9.35, alto:30.218, x1: null, x2: null, y1: null, y2:null},
                        { x:398.284, y:276.864, ancho:9.35, alto:26.51, x1: null, x2: null, y1: null, y2:null},
                        { x:325.237, y:228.501, ancho:9.35, alto:48.363, x1: null, x2: null, y1: null, y2:null},
                        { x:325.237, y:228.501, ancho:83.818, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:325.237, y:267.514, ancho:45.902, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:398.284, y:267.514, ancho:48.167, alto:9.35, x1: null, x2: null, y1: null, y2:null},
                        { x:400.63, y:115.348, ancho:47.2, alto:9.35, x1: null, x2: null, y1: null, y2:null}]

    // var bloques = [{x: 300, y:50, ancho: 400, alto: 10, x1: null, x2: null, y1: null, y2:null, color: "black"},
    //                {x: 300, y:90, ancho: 10, alto: 360, x1: null, x2: null, y1: null, y2:null},
    //                {x: 300, y:440, ancho: 400, alto: 10, x1: null, x2: null, y1: null, y2:null},
    //                {x: 690, y:90, ancho: 10, alto: 360, x1: null, x2: null, y1: null, y2:null}, 
    //                {x: 365, y:50, ancho: 10, alto: 350, x1: null, x2: null, y1: null, y2:null},
    //                {x: 430, y:100, ancho: 10, alto: 350, x1: null, x2: null, y1: null, y2:null},
    //                {x: 495, y:50, ancho: 10, alto: 350, x1: null, x2: null, y1: null, y2:null},
    //                {x: 560, y:100, ancho: 10, alto: 350, x1: null, x2: null, y1: null, y2:null},
    //                {x: 625, y:50, ancho: 10, alto: 350, x1: null, x2: null, y1: null, y2:null}]




    var datos={
        izquierda: false,
        derecha: false,
        arriba: false,
        abajo: false,
        fotograma: 0,
        segundos: 0
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
            = COLISIONES =
            =============================================*/

            jugador.x1 = jugador.x;
            jugador.x2 = jugador.x + jugador.width;
            jugador.y1 = jugador.y;
            jugador.y2 = jugador.y + jugador.height;

            

            for (let i = 0; i < bloques.length; i++) {
                bloques[i].x1 = bloques[i].x;
                bloques[i].x2 = bloques[i].x + bloques[i].ancho;
                bloques[i].y1 = bloques[i].y;
                bloques[i].y2 = bloques[i].y + bloques[i].alto;
            
                function colisiones() {
                
                    //NO COLISION DE IZQ A DER
                    if (jugador.x2 < bloques[i].x1) {return false;}
                    //NO COLISION DE DER A IZQ
                    if (jugador.x1 > bloques[i].x2) {return false;}
                    //NO COLISION DE ARRIBA A ABAJO
                    if (jugador.y2 < bloques[i].y1) {return false;}
                    //NO COLISION DE ABAJO A ARRIBA
                    if (jugador.y1 > bloques[i].y2) {return false;}
        
                    return true;
                }


                function inicio() {
                    if (jugador.x > 190 && jugador.x < 285){ if (jugador.y < 80 && jugador.y > 30) {
                        datos.fotograma = 0;
                        datos.segundos = 0; return true;} }

                    return false;

                }

                function umbral() {
                    if (jugador.x < 285 && jugador.y < 400) {return true;}
                    return false;
                }

                inicio();
                umbral();
        
                colisiones();
                //COLISION DE IZQ A DER
                if(colisiones() && jugador.x2 < bloques[i].x1 + jugador.movimientoX){
                    jugador.x = 280;
                    jugador.y = 55;
                    jugador.movimientoX = 0;
                    datos.fotograma = 0;
                    datos.segundos = 0;

                }
        
                //COLISION DE DER A IZQ
                if(colisiones() && jugador.x1 - jugador.movimientoX > bloques[i].x2){
                    jugador.x = 280;
                    jugador.y = 55;
                    jugador.movimientoX = 0;
                    datos.fotograma = 0;
                    datos.segundos = 0;

                }
        
                //COLISION DE ARRIBA  A ABAJO
                if(colisiones() && jugador.y2 < bloques[i].y1 + jugador.movimientoY){
                    jugador.x = 280;
                    jugador.y = 55;
                    jugador.movimientoY = 0;
                    datos.fotograma = 0;
                    datos.segundos = 0;
                }
        
                //COLISION DE ABAJO A ARRIBA
                if(colisiones() && jugador.y1 - jugador.movimientoY > bloques[i].y2){
                    jugador.x = 280;
                    jugador.y = 55;
                    jugador.movimientoY = 0;
                    datos.fotograma = 0;
                    datos.segundos = 0;
                }
            }
            /*=============================================
            = TEMPORIZADOR =
            =============================================*/

            if (datos.fotograma >= 60) {
                datos.fotograma = 0;
                datos.segundos ++;
            }
            time.innerHTML = datos.segundos;
            /*=============================================
            = UMBRALES =
            =============================================*/
            if (inicio()) {
                datos.fotograma = 0;
                datos.segundos = 0;
            }
            if (jugador.x >= 285 && jugador.y >= 55) {
                datos.fotograma ++;
            }else if(umbral() && jugador.x < 285 + jugador.movimientoX && jugador.y < 400){
                datos.fotograma = 0;
                datos.segundos = time.innerHTML;
            }else{
                datos.fotograma = 0;
            }

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







