//page loader function

/* global $ , google , navigator */

let loader;

function myFunction() {
  loader = setTimeout(showPage(), 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("page_loader").style.display = "block";
  document.getElementById("whole_page").style.display = "none";
}
// main form - find me localization function
// This function is clearing all fields if any value exist in fields
// Function also using geo location script to get User - town name and postcode
function FindMe() {

  // clear user form fields
  document.getElementById("main_form").reset();

  // remove input fields error messages
  //  postcode field
  document.getElementById("postcode_missing").classList.add("hidden");
  document.getElementById("postcode_missing").classList.remove("text-muted");
  document.getElementById("mainbox_postcode").style.border = "1px solid #ccc";
  // tick boxes
  document.getElementById("tickbox_missing").classList.add("hidden");
  document.getElementById("tickbox_missing").classList.remove("text-muted1");

  let myPostCode = document.getElementById("mainbox_postcode");

  initMap();

  // MAP FUNCTION

  let map, infoWindow;

  function initMap() {

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
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
}


// Clear postcode field and remove error message
function ClearPostcode() {
  $("#mainbox_postcode").val('');
  $("#postcode_missing").addClass("hidden");
  $("#postcode_missing").removeClass("text-muted");
  $("#mainbox_postcode").css("border", "1px solid #ccc");
}

// Clear all checboxes and hidden error message
function ClearCheckboxes() {
  $("#styled-checkbox-1").prop("checked", false);
  $("#styled-checkbox-2").prop("checked", false);
  $("#styled-checkbox-3").prop("checked", false);
  // clear errors
  $("#tickbox_missing").addClass("hidden");
  $("#tickbox_missing").removeClass("text-muted1");
}

// Select all checboxes and clear hidden error message
function SelectAll() {
  $("#styled-checkbox-1").prop("checked", true);
  $("#styled-checkbox-2").prop("checked", true);
  $("#styled-checkbox-3").prop("checked", true);
  // clear errors
  $("#tickbox_missing").addClass("hidden");
  $("#tickbox_missing").removeClass("text-muted1");
}







// main from - tix boxes, checking function
// This function validate main form and checks, if any tick box has been ticked
function StartYourTrip() {

  // main form variables
  let myPostCode = $("#mainbox_postcode").val;

  // check if Post Code input box is empty
  if (!myPostCode) {
    $("#postcode_missing").removeClass("hidden");
    $("#postcode_missing").addClass("text-muted");
    $("#mainbox_postcode").addClass("missing_e");
  }
  else {
    $("#postcode_missing").addClass("hidden");
    $("#postcode_missing").removeClass("text-muted");
    $("#mainbox_postcode").css("border", "1px solid #ccc");
  }

  // check if any of tick boxes has been clicked 'checked'
  let clubs_tick = ("styled-checkbox-1");
  let pubs_tick = document.getElementById("styled-checkbox-2");
  let bars_tick = document.getElementById("styled-checkbox-3");

  // if any of tick boxes is empty show allert comment
  if (!clubs_tick.checked && !pubs_tick.checked && !bars_tick.checked) {
    $("#tickbox_missing").removeClass("hidden");
    $("#tickbox_missing").addClass("text-muted1");
  }
  else {
    $("#tickbox_missing").addClass("hidden");
    $("#tickbox_missing").removeClass("text-muted1");
  }

  if (!myPostCode) {
    $("#postcode_missing").scrollIntoView({ behavior: "smooth" });
  }
  else if (!clubs_tick.checked && !pubs_tick.checked && !bars_tick.checked) {
    $("#tickbox_missing").scrollIntoView({ behavior: "smooth" });
  }
  else {
    $("#main_page_container").addClass("hidden");
    $("#map_container").removeClass("hidden");
    $("#map_container").addClass("map_main");
    $("#footer_main").addClass("hidden");
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
  $("#mainbox_postcode").val('');
  $("#styled-checkbox-1").prop("checked", false);
  $("#styled-checkbox-2").prop("checked", false);
  $("#styled-checkbox-3").prop("checked", false);
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
