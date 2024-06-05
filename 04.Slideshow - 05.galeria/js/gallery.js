
/*=============================================
= OBJETO CON LAS PROPIEDADES DE LA GALERIA  =
=============================================*/

var pg = {
        imgGaleria: document.querySelectorAll('#galeria ul li img'),
        rutaImagen: null,
        bodyDom: document.querySelector('body'),
        lightbox: null,
        modal: null,
        animacionGallery: "fade"
        
}


/*=============================================
= OBJETO CON LOS METODOS DE LA GALERIA      =
=============================================*/

var mg = {

    incioGaleria: function () {
        for (var i = 0; i < pg.imgGaleria.length; i++) {
            pg.imgGaleria[i].addEventListener("click", mg.capturaImagen);
        }
    },

    capturaImagen: function (img) {

        pg.rutaImagen = img.target;
        mg.lightbox(pg.rutaImagen);      
    },

    lightbox: function (img) {
        pg.bodyDom.appendChild(document.createElement("DIV")).setAttribute("id", "lightbox");
        pg.lightbox = document.querySelector("#lightbox");

        pg.lightbox.style.width = "100%";
        pg.lightbox.style.height = "100%";
        pg.lightbox.style.position = "fixed";
        pg.lightbox.style.zIndex = "10";
        pg.lightbox.style.background = "rgba(0,0,0,.8)";
        pg.lightbox.style.top = 0;
        pg.lightbox.style.left = 0;

        pg.lightbox.appendChild(document.createElement("DIV")).setAttribute("id", "modal");

        pg.modal = document.querySelector("#modal");

        pg.modal.innerHTML = img.outerHTML + "<div>x</div>";
        pg.modal.style.display = "block";
        pg.modal.style.position = "relative";
        pg.modal.childNodes[0].style.width = "100%";
        pg.modal.childNodes[0].style.border = "15px solid white";
        pg.modal.childNodes[0].style.borderRadius = "5px";

        if (window.matchMedia("(max-width: 1000px)").matches) {
            pg.modal.style.width = "90%";
        }else{
            pg.modal.style.width = "60%";
        }

        if(pg.animacionGallery == "slideLeft"){
            pg.modal.style.top = "50%";
            pg.modal.style.left = 0;
            pg.modal.style.opacity = 0;

            setTimeout(function() {
                pg.modal.style.transition = ".5s left ease";
                pg.modal.style.left = "50%";
                pg.modal.style.opacity = 1;
                pg.modal.style.marginLeft = -pg.modal.childNodes[0].width/2 + "px";
                pg.modal.style.marginTop = -pg.modal.childNodes[0].height/2 + "px";

            }, 50)
        }

        if(pg.animacionGallery == "slideTop"){
            pg.modal.style.top = "-100%";
            pg.modal.style.left = "50%";
            pg.modal.style.opacity = 0;

            setTimeout(function() {
                pg.modal.style.transition = ".5s top ease";
                pg.modal.style.top = "50%";
                pg.modal.style.opacity = 1;
                pg.modal.style.marginLeft = -pg.modal.childNodes[0].width/2 + "px";
                pg.modal.style.marginTop = -pg.modal.childNodes[0].height/2 + "px";

            }, 50)
        }
        
        if(pg.animacionGallery == "fade"){
            pg.modal.style.top = "50%";
            pg.modal.style.left = "50%";
            pg.modal.style.opacity = 0;

            setTimeout(function() {
                pg.modal.style.transition = ".5s opacity ease";
                pg.modal.style.opacity = 1;
                pg.modal.style.marginLeft = -pg.modal.childNodes[0].width/2 + "px";
                pg.modal.style.marginTop = -pg.modal.childNodes[0].height/2 + "px";

            }, 50)
        }
        // pg.modal.style.top = "50%";
        // pg.modal.style.left = "50%";
        // pg.modal.style.textAlaign = "center";
        // pg.modal.style.marginLeft = -pg.modal.childNodes[0].width/2 + "px";
        // pg.modal.style.marginTop = -pg.modal.childNodes[0].height/2 + "px";

       
        var node = pg.modal.childNodes[1];

        node.style.position = 'absolute';
        node.style.right = '5px';
        node.style.top = '5px';
        node.style.color = 'silver';
        node.style.cursor = 'pointer';
        node.style.fontSize = '30px';
        node.style.width = '40px';
        node.style.height = '40px';
        node.style.textAlign = 'center';
        node.style.background = 'white';
        node.style.borderRadius = '0px 0px 0px 5px';

        node.addEventListener("click", mg.closeGallery);



    },

    closeGallery: function () {
        pg.bodyDom.removeChild(pg.lightbox);
    }



}

mg.incioGaleria();



