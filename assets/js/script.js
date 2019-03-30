/* _____________________________________________________________________________  page loader function */
let loader;

function myFunction() {
  loader = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("page_loader").style.display = "block";
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
  /* town field */
  document.getElementById("town_missing").classList.add("hidden");
  document.getElementById("town_missing").classList.remove("text-muted");
  document.getElementById("mainbox_city").style.border = "1px solid #ccc";
  /* postcode field */
  document.getElementById("postcode_missing").classList.add("hidden");
  document.getElementById("postcode_missing").classList.remove("text-muted");
  document.getElementById("mainbox_postcode").style.border = "1px solid #ccc";
  /* tick boxes */
  document.getElementById("tickbox_missing").classList.add("hidden");
  document.getElementById("tickbox_missing").classList.remove("text-muted1");

  /* geo localization to find user location via clicking on "FindMe" button */
  let myTown = document.getElementById("mainbox_city");
  let myPostCode = document.getElementById("mainbox_postcode");


  /* test value */
  myTown.value = "Wellingborough";
  myPostCode.value = "NN82DF";


}
/* _____________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________ main from - clear fields function
This function is clearing Twon and Postcode filed in main form, on main page */
function Clearfields() {
  let myTown = document.getElementById("mainbox_city");
  let myPostCode = document.getElementById("mainbox_postcode");

  myTown.value = "";
  myPostCode.value = "";

  /* remove input fields error messages */
  /* town field */
  document.getElementById("town_missing").classList.add("hidden");
  document.getElementById("town_missing").classList.remove("text-muted");
  document.getElementById("mainbox_city").style.border = "1px solid #ccc";
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
  let chck_clubs = document.getElementById("clubs_check");
  if (chck_clubs.checked = true) {
    chck_clubs.click();
  }
  let chck_pubs = document.getElementById("pubs_check");
  if (chck_pubs.checked = true) {
    chck_pubs.click();
  }
  let chck_bars = document.getElementById("bars_check");
  if (chck_bars.checked = true) {
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
  let myTown = document.getElementById("mainbox_city").value;
  let myPostCode = document.getElementById("mainbox_postcode").value;

  /* check if Town input box is empty */
  if (!myTown) {
    document.getElementById("town_missing").classList.remove("hidden");
    document.getElementById("town_missing").classList.add("text-muted");
    document.getElementById("mainbox_city").style.border = "1px solid #f00";
  }
  else {
    document.getElementById("town_missing").classList.add("hidden");
    document.getElementById("town_missing").classList.remove("text-muted");
    document.getElementById("mainbox_city").style.border = "1px solid #ccc";
  }

  /* check if Post Code input box is empty */
  if (!myPostCode) {
    document.getElementById("postcode_missing").classList.remove("hidden");
    document.getElementById("postcode_missing").classList.add("text-muted");
    document.getElementById("mainbox_postcode").style.border = "1px solid #f00";
  }
  else {
    document.getElementById("postcode_missing").classList.add("hidden");
    document.getElementById("postcode_missing").classList.remove("text-muted");
    document.getElementById("mainbox_postcode").style.border = "1px solid #ccc";
  }

  /* check if any of tick boxes has been clicked 'checked' */
  let clubs_tick = document.getElementById("clubs_check");
  let pubs_tick = document.getElementById("pubs_check");
  let bars_tick = document.getElementById("bars_check");

  /* if any of tick boxes is empty show allert comment*/
  if (!clubs_tick.checked && !pubs_tick.checked && !bars_tick.checked) {
    document.getElementById("tickbox_missing").classList.remove("hidden");
    document.getElementById("tickbox_missing").classList.add("text-muted1");
  }
  else {
    document.getElementById("tickbox_missing").classList.add("hidden");
    document.getElementById("tickbox_missing").classList.remove("text-muted1");
  }

  if (!myTown) {
    document.getElementById("town_missing").scrollIntoView({ behavior: "smooth" });
  }
  else if (!myPostCode) {
    document.getElementById("postcode_missing").scrollIntoView({ behavior: "smooth" });
  }
  else if (!clubs_tick.checked && !pubs_tick.checked && !bars_tick.checked) {
    document.getElementById("tickbox_missing").scrollIntoView({ behavior: "smooth" });
  }
  else {
    /*do nithing*/
  }

  document.getElementById("main_page_container").classList.add("hidden");

  document.getElementById("map_container").classList.remove("hidden");
  document.getElementById("map_container").classList.add("map_main");

  document.getElementById("footer_main").classList.add("hidden");
}
/* _____________________________________________________________________________
________________________________________________________________________________ MAP FUNCTION */

function initMap() {
  let myLat = 51.509865
  let myLong = -0.118092

  // The location of Uluru
  var uluru = { lat: myLat, lng: myLong };
  // The map, centered at Uluru
  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 15, center: uluru });
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({ position: uluru, map: map });
}


function closeMap() {
  document.getElementById("main_page_container").classList.remove("hidden");

  document.getElementById("map_container").classList.add("hidden");

  document.getElementById("footer_main").classList.remove("hidden");
}
