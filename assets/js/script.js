//page loader function

/* global $ , google , navigator, global map */

function myFunction() {
  let loader;
  loader = setTimeout(showPage(), 3000);
}

function showPage() {
  $("#loader").css("display", "none");
  $("#page_loader").css("display", "block");
  $("#whole_page").css("display", "none");
}

// Find user location based on geolocalization from google
function FindMe() {

  // clear user form fields
  $("#main_form").trigger("reset");

  // remove input fields error messages
  $("#mainbox_postcode").removeClass("missing_e");
  $("#postcode_error").addClass("hidden");

  let postcode_box = $("#mainbox_postcode");

  // MAP FUNCTION

  let map, infoWindow;

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 10
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      let myloc = { lat: -34.304, lng: 150.533 };
      let marker = new google.maps.Marker({ position: myloc, map: map, /*icon: "assets/images/icons/marker_red.png",*/ });
      // geo localization to find user location via clicking on "FindMe" button 

      infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  let postcode = "your postcode";
  postcode_box.val(postcode);

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// Clear postcode field and remove error message
function ClearPostcode() {
  $("#mainbox_postcode").val('');
  $("#mainbox_postcode").removeClass("missing_e");
  $("#postcode_error").addClass("hidden");
}

// Clear all checboxes and hidden error message
function ClearCheckboxes() {
  $("#styled-checkbox-1 ,#styled-checkbox-2 ,#styled-checkbox-3").prop("checked", false);
  // clear errors
  $("#tickbox_missing").addClass("hidden");
  $(".c_boxes").removeClass("missing_e");
}

// Select all checboxes and clear hidden error message
function SelectAll() {
  $("#styled-checkbox-1 ,#styled-checkbox-2 ,#styled-checkbox-3").prop("checked", true);
  // clear errors
  $("#tickbox_missing").addClass("hidden");
  $("#tickbox_missing").removeClass("text-muted1");
}

// Check all required fields and start trip
function StartYourTrip() {

  let myPostCode = $("#mainbox_postcode").val();
  let checked_clubs = $("#styled-checkbox-1").prop("checked");
  let checked_pubs = $("#styled-checkbox-2").prop("checked");
  let checked_bars = $("#styled-checkbox-3").prop("checked");

  if (myPostCode == "") {
    $("#mainbox_postcode").addClass("missing_e");
    $("#postcode_error").removeClass("hidden");
  }
  else if (checked_clubs == false && checked_pubs == false && checked_bars == false) {
    $("#tickbox_missing").removeClass("hidden");
    $(".c_boxes").addClass("missing_e");
  }
  else {
    // Go to Map
    $("#main_page_container, #footer_main, #tickbox_missing").addClass("hidden");
    $("#map_container").addClass("map_main");
    $("#map_container").removeClass("hidden");

    $(".c_boxes").removeClass("missing_e");
    $("#mainbox_postcode").val("");
    $("#styled-checkbox-1 ,#styled-checkbox-2 ,#styled-checkbox-3").prop("checked", false);
  }
}

// Collaspe or expand sidebar
function collapseSideBar() {
  let toggle_q = document.getElementById("sidebar_blue").clientWidth;
  let tmpAnimation = 0;
  let element = $("#sidebar_collapse_icon");

  if (toggle_q === 360) {
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
    $("#hint_show").removeClass("hidden");
    $("#hint_hide").addClass("hidden");
    $("#main_sidebar").addClass("hidden");
    $("#ssb_icons").removeClass("hidden");
    $("#slider").fadeTo(150, 0);
    $("#sidebar_separate_line").fadeTo(150, 0);
    $("#logotype_sidebar").fadeTo(150, 0);
    $("#sidebar_copyrights").fadeTo(150, 0,
      function() {
        $("#sidebar_separate_line").addClass("hidden");
        $("#logotype_sidebar").addClass("hidden");
        $("#sidebar_copyrights").addClass("hidden");
      }
    );
  }
  else if (toggle_q === 70) {

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
    $("#hint_show").addClass("hidden");
    $("#hint_hide").removeClass("hidden");
    $("#main_sidebar").removeClass("hidden");
    $("#ssb_icons").addClass("hidden");
    $("#sidebar_separate_line").removeClass("hidden");
    $("#logotype_sidebar").removeClass("hidden");
    $("#sidebar_copyrights").removeClass("hidden");
    $("#slider").fadeTo(200, 1);
    $("#sidebar_separate_line").fadeTo(200, 1);
    $("#logotype_sidebar").fadeTo(200, 1);
    $("#sidebar_copyrights").fadeTo(200, 1);
  }
}
// TURN OFF OR ON MARKERS
function MarkerOnOff() {

  // if .red marker then
  // e.prevent deafauk
  // let id = this.id;

  $("#red_marker").click(function() {
    if ($(this).children("span").hasClass("hidden")) {
      $(this).children("span.tiptext_s").removeClass("hidden");
      $(this).children("img").attr("src", "assets/images/icons/marker_off.png");
    }
    else if ($(this).children("span").hasClass("tiptext_s")) {
      $(this).children("span.tiptext_s").addClass("hidden");
      $(this).children("img").attr("src", "assets/images/icons/marker_red.png");
    }
  });
  $("#green_marker").click(function() {
    if ($(this).children("span").hasClass("hidden")) {
      $(this).children("span.tiptext_s").removeClass("hidden");
      $(this).children("img").attr("src", "assets/images/icons/marker_off.png");
    }
    else if ($(this).children("span").hasClass("tiptext_s")) {
      $(this).children("span.tiptext_s").addClass("hidden");
      $(this).children("img").attr("src", "assets/images/icons/marker_green.png");
    }
  });
  $("#orange_marker").click(function() {
    if ($(this).children("span").hasClass("hidden")) {
      $(this).children("span.tiptext_s").removeClass("hidden");
      $(this).children("img").attr("src", "assets/images/icons/marker_off.png");
    }
    else if ($(this).children("span").hasClass("tiptext_s")) {
      $(this).children("span.tiptext_s").addClass("hidden");
      $(this).children("img").attr("src", "assets/images/icons/marker_orange.png");
    }
  });
  $("#blue_marker").click(function() {
    if ($(this).children("span").hasClass("hidden")) {
      $(this).children("span.tiptext_s").removeClass("hidden");
      $(this).children("img").attr("src", "assets/images/icons/marker_off.png");
    }
    else if ($(this).children("span").hasClass("tiptext_s")) {
      $(this).children("span.tiptext_s").addClass("hidden");
      $(this).children("img").attr("src", "assets/images/icons/marker_blue.png");
    }
  });
}

// Close map function ( red corss - button )
function closeMap() {
  $("#main_page_container").removeClass("hidden");
  $("#map_container").addClass("hidden");
  $("#footer_main").removeClass("hidden");
}

// Reset sliders to "50 Miles" - value
function resetRadius() {
  $("#clubs_dis_range").val("50");
  $("#clubs_distance").html($("#clubs_dis_range").val() + "&nbsp;" + "Miles");
  $("#pubs_dis_range").val("50");
  $("#pubs_distance").html($("#pubs_dis_range").val() + "&nbsp;" + "Miles");
  $("#bars_dis_range").val("50");
  $("#bars_distance").html($("#bars_dis_range").val() + "&nbsp;" + "Miles");
}

// Download page view
function downloadMe() {
  alert("Your AlcoTrip map has been saved.");
}

// Sidebar sliders - listeners
$(document).on("input change", "#clubs_dis_range", function() {
  $("#clubs_distance").html($(this).val() + "&nbsp;" + "Miles");
});
$(document).on('input change', "#pubs_dis_range", function() {
  $("#pubs_distance").html($(this).val() + "&nbsp;" + "Miles");
});
$(document).on('input change', "#bars_dis_range", function() {
  $("#bars_distance").html($(this).val() + "&nbsp;" + "Miles");
});

// Checkbox listeners
