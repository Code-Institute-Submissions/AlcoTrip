//page loader function
/* global $, browser_height */

function hideElements() {
    $("#hint_hide, #main_sidebar, #sidebar_logo_top").addClass("hidden");
    $("#hint_show, #ssb_icons").removeClass("hidden");
    $("#slider, #sidebar_separate_line, #logotype_sidebar, #sidebar_copyrights, #sidebar_buttons, #sidebar_logo_top").fadeTo(250, 0,
        function() {
            $("#sidebar_separate_line, #logotype_sidebar, #sidebar_copyrights").addClass("hidden");
        }
    );
    if (browser_height <= 750) {
        $(".collapse_sidebar").css("margin-left", "0px");
        $("#logotype_sidebar").addClass("hidden");
    }
    else {
        $("#logotype_sidebar").removeClass("hidden");
    }
}


// Collaspe or expand sidebar
$('#sidebar_collapse_icon').click(function() {
    let toggle_q = document.getElementById("sidebar_blue").clientWidth;
    let tmpAnimation = 0;
    let element = $("#sidebar_collapse_icon");
    let browser_height = $(window).height();
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
            hideElements()
            break;
            // when wide sidebar is 320px width
        case 320:
            document.documentElement.style
                .setProperty("--sBar_width", "68px");
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
            // when little sidebar is 70px width
        case 70:
            document.documentElement.style
                .setProperty("--sBar_width", "360px");
            tmpAnimation = tmpAnimation - 0;
            $({ degrees: tmpAnimation + 180 }).animate({ degrees: tmpAnimation }, {
                duration: 300,
                step: function(now) {
                    element.css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                }
            });
            if (browser_height <= 750) {
                $(".collapse_sidebar").css("margin-left", "20px");
                $("#logotype_sidebar").addClass("hidden");
            }
            else {
                $("#logotype_sidebar").removeClass("hidden");
            }
            break;
            // when little sidebar is 68px width
        case 68:
            document.documentElement.style
                .setProperty("--sBar_width", "320px");
            tmpAnimation = tmpAnimation - 0;
            $({ degrees: tmpAnimation + 180 }).animate({ degrees: tmpAnimation }, {
                duration: 300,
                step: function(now) {
                    element.css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                }
            });
            $("#hint_show ,#ssb_icons").addClass("hidden");
            $("#hint_hide, #main_sidebar, #sidebar_separate_line, #logotype_sidebar, #sidebar_copyrights, #sidebar_logo_top").removeClass("hidden");
            $("#slider, #sidebar_separate_line, #logotype_sidebar, #sidebar_copyrights, #sidebar_buttons, #sidebar_logo_top").fadeTo(250, 1);
            if (browser_height <= 750) {
                $(".collapse_sidebar").css("margin-left", "20px");
                $("#logotype_sidebar").addClass("hidden");
            }
            else {}
            break;
        default:
    }
});
