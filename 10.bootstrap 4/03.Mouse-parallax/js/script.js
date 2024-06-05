
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