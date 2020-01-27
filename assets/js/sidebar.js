//page loader function
/* global $*/

let browser_width = $(window).width();
let browser_height = $(window).height();

//console.log(browser_height);
//console.log(browser_width);

function hideElements() {
    $('#collapse_icon').html('show');
    $('#location_result, #slider_c, #slider_p, #slider_b, #sidebar_buttons').addClass('hidden');
}

function showElements() {
    $('#collapse_icon').html('hide');
    $('#location_result, #slider_c, #slider_p, #slider_b, #sidebar_buttons').RemoveClass('hidden');
}

// MINIMIZE AND MAXIMIZE SIDEBAR - MAIN FUNCTION 
$('#sidebar_collapse_icon').click(function() {
    let toggle_q = document.getElementById("sidebar_blue").clientWidth;
    let tmpAnimation = 0;
    let element = $("#sidebar_collapse_icon");


    switch (toggle_q) {
        // when wide sidebar is 360px width
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
    }
});
