/* _____________________________________________________________________________  page loader function */

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
/* _____________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________ main form - find me localization function
This function is clearing all fields if any value exist in fields
Function also using geo location script to get User - town name and postcode */
function FindMe() {

  /* clear user form fields */
  document.getElementById("main_form").reset();

  /* remove input fields error messages */
  /* postcode field */
  document.getElementById("postcode_missing").classList.add("hidden");
  document.getElementById("postcode_missing").classList.remove("text-muted");
  document.getElementById("mainbox_postcode").style.border = "1px solid #ccc";
  /* tick boxes */
  document.getElementById("tickbox_missing").classList.add("hidden");
  document.getElementById("tickbox_missing").classList.remove("text-muted1");

  let myPostCode = document.getElementById("mainbox_postcode");

  initMap();

  /* _____________________________________________________________________________
________________________________________________________________________________ MAP FUNCTION */

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
        /* geo localization to find user location via clicking on "FindMe" button */

        infoWindow.setPosition(pos);
        /*infoWindow.setContent('Location found.');*/
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
/* _____________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________ main from - clear fields function
This function is clearing Twon and Postcode filed in main form, on main page */
function Clearfields() {

  let myPostCode = document.getElementById("mainbox_postcode");

  myPostCode.value = "";

  /* remove input fields error messages */
  /* postcode field */
  document.getElementById("postcode_missing").classList.add("hidden");
  document.getElementById("postcode_missing").classList.remove("text-muted");
  document.getElementById("mainbox_postcode").style.border = "1px solid #ccc";

}
/* _____________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________ checkboxes - clear fields function
This function is clearing Twon and Postcode filed in main form, on main page */
function ClearCheckboxes() {

  let chck_clubs = document.getElementById("styled-checkbox-1");
  if (chck_clubs.checked == true) {
    chck_clubs.click();
  }
  let chck_pubs = document.getElementById("styled-checkbox-2");
  if (chck_pubs.checked == true) {
    chck_pubs.click();
  }
  let chck_bars = document.getElementById("styled-checkbox-3");
  if (chck_bars.checked == true) {
    chck_bars.click();
  }
  /* tick boxes */
  document.getElementById("tickbox_missing").classList.add("hidden");
  document.getElementById("tickbox_missing").classList.remove("text-muted1");
}
/* _____________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________ main from - tix boxes, checking function
This function validate main form and checks, if any tick box has been ticked */
function StartYourTrip() {

  /* main form variables */
  let myPostCode = document.getElementById("mainbox_postcode").value;

  /* check if Post Code input box is empty */
  if (!myPostCode) {
    document.getElementById("postcode_missing").classList.remove("hidden");
    document.getElementById("postcode_missing").classList.add("text-muted");
    document.getElementById("mainbox_postcode").classList.add("missing_e");
  }
  else {
    document.getElementById("postcode_missing").classList.add("hidden");
    document.getElementById("postcode_missing").classList.remove("text-muted");
    document.getElementById("mainbox_postcode").style.border = "1px solid #ccc";
  }

  /* check if any of tick boxes has been clicked 'checked' */
  let clubs_tick = document.getElementById("styled-checkbox-1");
  let pubs_tick = document.getElementById("styled-checkbox-2");
  let bars_tick = document.getElementById("styled-checkbox-3");

  /* if any of tick boxes is empty show allert comment*/
  if (!clubs_tick.checked && !pubs_tick.checked && !bars_tick.checked) {
    document.getElementById("tickbox_missing").classList.remove("hidden");
    document.getElementById("tickbox_missing").classList.add("text-muted1");
  }
  else {
    document.getElementById("tickbox_missing").classList.add("hidden");
    document.getElementById("tickbox_missing").classList.remove("text-muted1");
  }

  if (!myPostCode) {
    document.getElementById("postcode_missing").scrollIntoView({ behavior: "smooth" });
  }
  else if (!clubs_tick.checked && !pubs_tick.checked && !bars_tick.checked) {
    document.getElementById("tickbox_missing").scrollIntoView({ behavior: "smooth" });
  }
  else {
    document.getElementById("main_page_container").classList.add("hidden");

    document.getElementById("map_container").classList.remove("hidden");
    document.getElementById("map_container").classList.add("map_main");

    document.getElementById("footer_main").classList.add("hidden");
  }
}


/* _____________________________________________________________________________
________________________________________________________________________________ SIDEBAR FUNCTION */
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
    document.getElementById("hint_show").classList.remove("hidden");
    document.getElementById("hint_hide").classList.add("hidden");
    document.getElementById("main_sidebar").classList.add("hidden");
    document.getElementById("ssb_icons").classList.remove("hidden");
    $("#slider").fadeTo(150, 0);
    $("#sidebar_separate_line").fadeTo(150, 0);
    $("#logotype_sidebar").fadeTo(150, 0);
    $("#sidebar_copyrights").fadeTo(150, 0,
      function() {
        document.getElementById("sidebar_separate_line").classList.add("hidden");
        document.getElementById("logotype_sidebar").classList.add("hidden");
        document.getElementById("sidebar_copyrights").classList.add("hidden");
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
    document.getElementById("hint_show").classList.add("hidden");
    document.getElementById("hint_hide").classList.remove("hidden");
    document.getElementById("main_sidebar").classList.remove("hidden");
    document.getElementById("ssb_icons").classList.add("hidden");
    document.getElementById("sidebar_separate_line").classList.remove("hidden");
    document.getElementById("logotype_sidebar").classList.remove("hidden");
    document.getElementById("sidebar_copyrights").classList.remove("hidden");
    $("#slider").fadeTo(200, 1);
    $("#sidebar_separate_line").fadeTo(200, 1);
    $("#logotype_sidebar").fadeTo(200, 1);
    $("#sidebar_copyrights").fadeTo(200, 1);
  }
}
/* _____________________________________________________________________________
________________________________________________________________________________ TURN OFF OR ON MARKERS */
function MarkerOnOff() {


  /* if .red marker then
    e.prevent deafauk
    let id = this.id;
    

  */

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


function closeMap() {
  document.getElementById("main_page_container").classList.remove("hidden");
  document.getElementById("map_container").classList.add("hidden");
  document.getElementById("footer_main").classList.remove("hidden");
}

/*______________________________________________________________________________
________________________________________________________________________________ RESTE SLIDERS VALUE TO DEFAULT - 50 MILES */
function resetRadius() {
  $("#clubs_dis_range").val("50");
  $("#clubs_distance").html($("#clubs_dis_range").val() + "&nbsp;" + "Miles");
  $("#pubs_dis_range").val("50");
  $("#pubs_distance").html($("#pubs_dis_range").val() + "&nbsp;" + "Miles");
  $("#bars_dis_range").val("50");
  $("#bars_distance").html($("#bars_dis_range").val() + "&nbsp;" + "Miles");
}

function downloadMe() {
  alert("Your AlcoTrip map has been saved.");
}


/*______________________________________________________________________________
________________________________________________________________________________ SIDEBAR SLIDER LISTINERS */
$(document).on("input change", "#clubs_dis_range", function() {
  $("#clubs_distance").html($(this).val() + "&nbsp;" + "Miles");
});

$(document).on('input change', "#pubs_dis_range", function() {
  $("#pubs_distance").html($(this).val() + "&nbsp;" + "Miles");
});

$(document).on('input change', "#bars_dis_range", function() {
  $("#bars_distance").html($(this).val() + "&nbsp;" + "Miles");
});
