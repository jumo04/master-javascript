
/*=============================================
=     OBJETO DE PROPIEDADES            =
=============================================*/

var ps = {

    posicionScroll: 0,
    articles: document.querySelectorAll("#scroll article"),
    cajaScroll: document.querySelector("#scroll"),
    header: document.querySelector("header"),
    botonera: document.querySelectorAll("nav ul li a"),
    ruta: null, 
    intervalo: null,
    destinoScroll: 0, 
    padding: 0

}


/*=====  OBJETO DE PROPIEDADES  ======*/

/*=============================================
=      OBJETO DE METODOS O FUNCIONES     =
=============================================*/


var ms ={

    inicioScroll: function () {
        document.addEventListener("scroll", ms.efectoParallax);
        document.addEventListener("scroll", ms.stickedScroll);

        for (let i = 0; i < ps.botonera.length; i++) {

            ps.botonera[i].addEventListener('click', ms.desplazamiento);
        }
    },

    stickedScroll: function () {
        ps.posicionScroll = window.scrollY;

        if (ps.posicionScroll > 112) {
            ps.header.style.position = "fixed";
            ps.header.style.zIndex = 100;
            if (window.matchMedia("(min-width: 768px)").matches) {
                 ps.padding = 90;  
            }else{
                ps.padding = 140;  
            }
        }
        if (ps.posicionScroll < 112) {
            ps.header.style.position = "relative";
            ps.header.style.zIndex = 0;
            if (window.matchMedia("(min-width: 768px)").matches) {
                ps.padding = 160;
            }else{
                ps.padding = 280;

            }
        }
    },

    efectoParallax: function () {
        ps.posicionScroll = window.scrollY;

        if (ps.posicionScroll > ps.cajaScroll.offsetTop-200) {
            for (let i = 0; i < ps.articles.length; i++) {
               ps.articles[i].style.marginLeft = "0%";
            }
        }else{
            for (let i = 0; i < ps.articles.length; i++) {
                if (window.matchMedia("(min-width: 768px)").matches) {
                  ps.articles[i].style.marginLeft = ps.posicionScroll/25 - 100 + "%";
                    
                }
             }
        }
    },
    
    desplazamiento: function (ruta) {
        ruta.preventDefault();
        ps.ruta = ruta.target.getAttribute("href");

        ps.destinoScroll = document.querySelector(ps.ruta).offsetTop-ps.padding;

        
        ps.intervalo = setInterval(function(){

            if (ps.posicionScroll < ps.destinoScroll) {
                ps.posicionScroll+=10;
                if (ps.posicionScroll >= ps.destinoScroll) {
                    ps.posicionScroll = ps.destinoScroll
                    clearInterval(ps.intervalo);
                }
            }else{
                ps.posicionScroll-=10;
                if (ps.posicionScroll <= ps.destinoScroll) {
                    ps.posicionScroll = ps.destinoScroll
                    clearInterval(ps.intervalo);
                }
            }

            window.scrollTo(0, ps.posicionScroll);
        }, 0.1)

        
    }

}

ms.inicioScroll();


/*=====  End of OBJETO DE METODOS O FUNCIONES  ======*/

