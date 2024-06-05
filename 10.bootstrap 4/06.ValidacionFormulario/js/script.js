
$('.pinterest-grid').pinterest_grid({
    no_columns: 4,
    padding_x: 10,
    padding_y: 10,
    margin_bottom: 50,
    single_column_breakpoint: 700
});



$('.slideShow').jdSlider({
    wrap: ".slide-inner",
    isAuto: true,

    isLoop: true,
    interval: 7000,
    isCursor: true,

});

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});


var mouse_parallax = $(".mouse_parallax");

$(".mouse_parallax").mousemove(function(e) {
    var posX = e.offsetX;
    var posY = e.offsetY;

    for (let i = 0; i < mouse_parallax.length; i++) {
        $(mouse_parallax[i]).css({
            "width": "110%",
            "left": -posX / (i*250) + "%",
            "top": posY / (i*250) + "%",
        })
        
    }
    $(mouse_parallax[0]).css({"width":"100%"})


})

// Navegacion Scroll

$(".nav-link").click(function (e) {
    e.preventDefault();
    var target = $(this).attr("href");

    $("html, body").animate({
        scrollTop: $(target).offset().top
    },1000, "easeOutBack")
})

//scrollup

$.scrollUp({
    scrollText: '',
    scrollSpeed: 2000,
    easingType: "easeOutQuint"
})

//superscrollograma

var controller = $.superscrollorama();

controller.addTween('#article .container', TweenMax.from(
    $("#article .container"), .25, {css:{marginLeft: "-100%"}, ease:Quad.easeInOut}
));

if (window.matchMedia("(min-width:991px)").matches) {
    $("#sticker").sticky({topSpacing:0, zIndex:1000});
}




//Validar Formulario
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Get the forms we want to add validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

  $('.icheck').iCheck({
        checkboxClass: "icheckbox_flat-blue",
        radioClass: "iradio_flat-blue"
  })