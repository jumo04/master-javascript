$(document).ready(function(){



 // Navegacion Scroll

$(".nav-link").click(function (e) {
    e.preventDefault();
    
    var target = $(this).attr("href");
    console.log(target);
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

$("#scrollUp").css({
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    background: "url(../assets/img/flecha.jpg)"
})

var controller = $.superscrollorama();

controller.addTween('#article .container', TweenMax.from(
    $("#article .container"), .25, {css:{marginLeft: "-100%"}, ease:Quad.easeInOut}
));

if (window.matchMedia("(min-width:991px)").matches) {
    $("#sticker").sticky({topSpacing:0, zIndex:1000});
}


})
