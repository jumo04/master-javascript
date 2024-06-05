
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