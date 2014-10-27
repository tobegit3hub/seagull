
/* Popup the larger image in home page, code from http://www.bootply.com/Zla4ld4aD1 */
function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-dialog");
    var offset = ($(window).height() - $dialog.height()) / 2;
    // Center modal vertically in window
    $dialog.css("margin-top", offset);
}

$('.modal').on('show.bs.modal', centerModal);

$(window).on("resize", function () {
    $('.modal:visible').each(centerModal);
});


$(function(){
    /* Animation for nav in index page */
    $('.animate-nav').hover(function(){
        $(this).addClass('animated pulse');
    },function(){
        $(this).removeClass('animated pulse');
    });
});
