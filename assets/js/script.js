//page loader function
/* global $, global Swal, google, navigator, myLat, myLong, postcodeValidation, barsRadius, createMarker, markers, setMapOnAll */
/* global xLat, global xLong*/
let myLat, myLong;


function myFunction() {
    let loader = setTimeout(showPage(), 3000);
}

function showPage() {
    $("#loader, #whole_page").css("display", "none");
    $("#page_loader").css("display", "block");
}

// Find user location based on geolocalization from google
$('#findme_button').click(function() {

    /* $("#mainbox_postcode").removeClass("missing_e");
    $("#postcode_error").addClass("hidden");
    let g_location = "your postcode";
    $("#mainbox_postcode").val(g_location);*/

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


// Check all required fields,
// pass the postcode value to H3 on map page and start trip.

$('#start_trip_button').click(function() {

    let myPostCode, checked_clubs, checked_bars, checked_pubs;

    myPostCode = $("#mainbox_postcode").val();
    checked_clubs = $("#styled-checkbox-1").prop("checked");
    checked_bars = $("#styled-checkbox-3").prop("checked");
    checked_pubs = $("#styled-checkbox-2").prop("checked");

    if (myPostCode == "") {
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

        // passing value from postcode field to h3 selector
        let myPostcode = $("#mainbox_postcode").val();
        myPostcode = myPostcode.replace(/\s/g, "");
        myPostcode = String(myPostcode.toUpperCase());

        //postcode validation
        event.preventDefault();
        $.get(encodeURI("https://api.postcodes.io/postcodes/" + myPostcode + "/validate"))
            .done(function(data) {

                let postcodeValidation = data['result'];
                console.log(postcodeValidation);


                if (postcodeValidation) {

                    $("#postcode_sidebar").html(myPostcode);


                    // Variables
                    let map;



                    event.preventDefault();
                    $.get(encodeURI("https://api.postcodes.io/postcodes/" + myPostcode))
                        .done(function(data) {
                            myLat = data.result['latitude'];
                            myLong = data.result['longitude'];

                            // current position from postcode - main variable
                            let myLocation = { lat: myLat, lng: myLong };

                            // new map

                            let mapOptions = {
                                zoom: 15,
                                maxZoom: 18,
                                minZoom: 10,
                                center: myLocation,
                                mapTypeId: 'roadmap'
                            };
                            map = new google.maps.Map(document.getElementById('map'),
                                mapOptions);


                            // all markers
                            let markerCurrntPos, markerClubsPos, markerPubsPos, markerBarsPos;

                            // create current position marker
                            let yourPosition = new google.maps.Marker({
                                position: myLocation,
                                animation: google.maps.Animation.DROP,
                                map: map,
                            });

                            // bounced drop down for current position marker
                            function toggleBounce() {
                                if (yourPosition.getAnimation() !== null) {
                                    yourPosition.setAnimation(null);
                                }
                                else {
                                    yourPosition.setAnimation(google.maps.Animation.BOUNCE);
                                }
                            }

                            const placeService = new google.maps.places.PlacesService(map);

                            const request = {
                                query: 'japan',
                                fields: ['place_id'],
                            };

                            placeService.findPlaceFromQuery(request, (results, status) => {
                                if (status == google.maps.places.PlacesServiceStatus.OK) {

                                    results.forEach((item) => {
                                        console.log(item);
                                        // place_id, name, formatted_address, geometry.location, icon
                                    });
                                }
                            });

                        });
                    // Go to Map
                    $("#main_page_container, #postcode_error, #tickbox_missing, #footer_main").addClass("hidden");
                    $("#map_container").addClass("map_main");
                    $("#map_container").removeClass("hidden");
                    $("#mainbox_postcode, .c_boxes").removeClass("missing_e");
                    $("#styled-checkbox-1 ,#styled-checkbox-2 ,#styled-checkbox-3").prop("checked", false);
                }
                else {
                    alert("somwthong is wrong!")
                }
            });
    }
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

// Reset sliders to "50 Miles" - value
$("#reset_sliders").click(function() {
    $("#clubs_dis_range, #pubs_dis_range, #bars_dis_range").val(50);
    $("#clubs_distance").html($("#clubs_dis_range").val() + "&nbsp;" + "Miles");
    $("#pubs_distance").html($("#pubs_dis_range").val() + "&nbsp;" + "Miles");
    $("#bars_distance").html($("#bars_dis_range").val() + "&nbsp;" + "Miles");
});

// Apply sliders changes when accepted
$('#apply_sliders').click(function() {
    let clubs_range = $('#clubs_dis_range').val();
    let pubs_range = $('#pubs_dis_range').val();
    let bars_range = $('#bars_dis_range').val();
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

// Close map function ( red corss - button )
$('#exit_icon, #sidebar_logo').click(function() {
    $('#main_page_container').removeClass('hidden');
    $('#map_container').addClass('hidden');
    $('#footer_main').removeClass('hidden');
    $("#mainbox_postcode").val("");
});
