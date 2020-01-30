/* global $ */

/* browser width and height variables */
let browserWidth = $(window).width();
let browserHeight = $(window).height();

console.log(browserHeight);
console.log(browserWidth);

/**
 * This function will hide elements on side bar
 */
function hideElements() {
    $('#collapse_icon').html('show');
    $('.sidebar_elements').addClass('hidden');
}
/**
 * This function will show elements on side bar
 */
function showElements() {
    $('#collapse_icon').html('hide');
    $('.sidebar_elements').removeClass('hidden');
}









/**
 * This function will change the size of the sidebar when width point is match
 */
$('#sidebar_collapse_icon').click(function() {
    let toggle_q = $("#sidebar_blue").width();
    let tmpAnimation = 0;
    let element = $("#sidebar_collapse_icon");


    switch (toggle_q) {
        case 360:
            document.documentElement.style
                .setProperty("--sBar_width", "70px");
            tmpAnimation = tmpAnimation - 180;
            $({ degrees: tmpAnimation - 180 }).animate({ degrees: tmpAnimation }, {
                duration: 300,
                step: function(now) {
                    element.css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                }
            });
            hideElements();
            break;
        case 70:
            document.documentElement.style
                .setProperty("--sBar_width", "360px");
            $({ degrees: tmpAnimation + 180 }).animate({ degrees: tmpAnimation }, {
                duration: 300,
                step: function(now) {
                    element.css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                }
            });
            showElements();
            break;
    }
});
