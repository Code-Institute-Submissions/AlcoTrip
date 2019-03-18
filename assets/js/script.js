/* page loader function */
var loader;

function myFunction() {
  loader = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("page_loader").style.display = "block";
}

/* _____________________________________________________________________________ main from functions */
function FindMe() {

  /* clear user form fields */
  document.getElementById("main_form").reset();

  /* remove input fields error messages */
  document.getElementById("town_missing").classList.remove("text-muted");
  document.getElementById("town_missing").classList.remove("text-muted");

  /* geo localization to find user location via clicking on "FindMe" button */
  var myFindMe = "Find Me!";

}

/*  This function validate main form and checks, if any tick box has been ticked */
function StartYourTrip() {

  /* main form variables */
  var myTown = document.getElementById("mainbox_city").value;
  var myPostCode = document.getElementById("mainbox_postcode").value;

  /* check if Town input box is empty */
  if (!myTown) {
    document.getElementById("town_missing").classList.remove("hidden");
    document.getElementById("town_missing").classList.add("text-muted");
  }
  else {
    document.getElementById("town_missing").classList.add("hidden");
    document.getElementById("town_missing").classList.remove("text-muted");
  }

  /* check if Post Code input box is empty */
  if (!myPostCode) {
    document.getElementById("postcode_missing").classList.remove("hidden");
    document.getElementById("postcode_missing").classList.add("text-muted");
  }
  else {
    document.getElementById("postcode_missing").classList.add("hidden");
    document.getElementById("postcode_missing").classList.remove("text-muted");
  }

  /* check if any of tick boxes has been clicked 'checked' */
  var clubs_tick = document.getElementById("clubs_check");
  var pubs_tick = document.getElementById("pubs_check");
  var bars_tick = document.getElementById("bars_check");

  if (!clubs_tick.checked && !pubs_tick.checked && !bars_tick.checked) {
    document.getElementById("tickbox_missing").classList.remove("hidden");
    document.getElementById("tickbox_missing").classList.add("text-muted");
  }
  else {
    document.getElementById("tickbox_missing").classList.add("hidden");
    document.getElementById("tickbox_missing").classList.remove("text-muted");
  }

}
