//page loader function
/* global $ , google , navigator, global map, pos, global Swal, browser_height, mymap, L, club_radius, createMarker, service, infowindow, jsPDF, myPostCode, checked_clubs, checked_bars, checked_pubs */

function myFunction() {
  let loader = setTimeout(showPage(), 3000);
}



function showPage() {
  $("#loader, #whole_page").css("display", "none");
  $("#page_loader").css("display", "block");
}



// Check all required fields,
// pass the postcode value to H3 on map page and start trip.

$('#start_trip_button').click(function() {

  let myPostCode, checked_clubs, checked_bars, checked_pubs;

  myPostCode = $("#mainbox_postcode").val();
  checked_clubs = $("#styled-checkbox-1").prop("checked");
  checked_bars = $("#styled-checkbox-3").prop("checked");
  checked_pubs = $("#styled-checkbox-2").prop("checked");

  if (myPostCode === "") {
    $("#mainbox_postcode").addClass("missing_e");
    $("#postcode_error").removeClass("hidden");
    $('html, body').animate({
      scrollTop: ($('#postcode_missing').offset().top)
    }, 500);
  }
  else if (checked_clubs == false && checked_pubs == false && checked_bars == false) {
    $("#tickbox_missing").removeClass("hidden");
    $(".c_boxes").addClass("missing_e");
    $('html, body').animate({
      scrollTop: ($('#tickbox_missing_err').offset().top)
    }, 500);
  }
  else {
    // Go to Map
    $("#main_page_container, #postcode_error, #tickbox_missing, #footer_main").addClass("hidden");
    $("#map_container").addClass("map_main");
    $("#map_container").removeClass("hidden");
    $("#mainbox_postcode, .c_boxes").removeClass("missing_e");
    $("#styled-checkbox-1 ,#styled-checkbox-2 ,#styled-checkbox-3").prop("checked", false);
  }

  // passing value from postcode field to h3 selector
  let myPostcode = $("#mainbox_postcode").val();
  myPostcode = myPostcode.replace(/\s/g, "");
  myPostcode = String(myPostcode.toUpperCase());

  $("#postcode_sidebar").html(myPostcode);

});



// Find user location based on geolocalization from google
$('#findme_button').click(function() {


  $("#mainbox_postcode").removeClass("missing_e");
  $("#postcode_error").addClass("hidden");
  $("#mainbox_postcode").val('something');


});



// Clear postcode field and remove error message


$('#clear_postcode').click(function() {
  $("#mainbox_postcode").val('');
  $("#mainbox_postcode").removeClass("missing_e");
  $("#postcode_error").addClass("hidden");
});



// Clear all checboxes and hidden error message
$('#unselect_all_checkbox').click(function() {
  $("#styled-checkbox-1 ,#styled-checkbox-2 ,#styled-checkbox-3").prop("checked", false);
  // clear errors
  $("#tickbox_missing").addClass("hidden");
  $(".c_boxes").removeClass("missing_e");
});



// Select all checboxes and clear hidden error message
$('#select_all_checkbox').click(function() {
  $("#styled-checkbox-1 ,#styled-checkbox-2 ,#styled-checkbox-3").prop("checked", true);
  // clear errors
  $("#tickbox_missing").addClass("hidden");
  $("#tickbox_missing").removeClass("text-muted1");
  $(".c_boxes").removeClass("missing_e");
});



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
      $("#hint_hide, #main_sidebar, #sidebar_logo_top").addClass("hidden");
      $("#hint_show, #ssb_icons").removeClass("hidden");
      $("#slider, #sidebar_separate_line, #logotype_sidebar, #sidebar_copyrights, #sidebar_buttons, #sidebar_logo_top").fadeTo(250, 0,
        function() {
          $("#sidebar_separate_line, #logotype_sidebar, #sidebar_copyrights").addClass("hidden");
        }
      );
      if (browser_height <= 750) {
        $("#logotype_sidebar").addClass("hidden");
      }
      else {
        $("#logotype_sidebar").removeClass("hidden");
      }
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



$('#').click(function() {
  $("#hint_show ,#ssb_icons").addClass("hidden");
  $("#hint_hide, #main_sidebar, #sidebar_separate_line, #logotype_sidebar, #sidebar_copyrights, #sidebar_logo_top").removeClass("hidden");
  $("#slider, #sidebar_separate_line, #logotype_sidebar, #sidebar_copyrights, #sidebar_buttons, #sidebar_logo_top").fadeTo(250, 1);
});



// Close map function ( red corss - button )
$('#exit_icon').click(function() {
  $('#main_page_container').removeClass('hidden');
  $('#map_container').addClass('hidden');
  $('#footer_main').removeClass('hidden');
});



// Reset sliders to "50 Miles" - value
$('#reset_sliders').click(function() {
  $("#clubs_dis_range, #pubs_dis_range, #bars_dis_range").val("50");
  $("#clubs_distance").html($("#clubs_dis_range").val() + "&nbsp;" + "Miles");
  $("#pubs_distance").html($("#pubs_dis_range").val() + "&nbsp;" + "Miles");
  $("#bars_distance").html($("#bars_dis_range").val() + "&nbsp;" + "Miles");
});



$('#download').click(function() {
  // download as pdf function
  // when downloaded show allert box
  Swal.fire({
    position: 'center',
    type: 'success',
    title: 'Your AlcoTrip has been saved',
    text: 'check your "downloads" folder',
    showConfirmButton: false,
    timer: 2500
  });
});



// Sidebar sliders - listeners
$(document).on("input change", "#clubs_dis_range", function() {
  $("#clubs_distance").html($(this).val() + "&nbsp;" + "Miles");
});
$(document).on("input change", "#pubs_dis_range", function() {
  $("#pubs_distance").html($(this).val() + "&nbsp;" + "Miles");
});
$(document).on("input change", "#bars_dis_range", function() {
  $("#bars_distance").html($(this).val() + "&nbsp;" + "Miles");
});
