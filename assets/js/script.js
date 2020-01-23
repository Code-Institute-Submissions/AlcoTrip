//page loader function
/* global $, global Swal, google, clubs_range */
/* global, gLat, gLong */
let myLat, myLong;

clubs_range = $('#clubs_dis_range').val();
//pubs_range = $('#pubs_dis_range').val();
//bars_range = $('#bars_dis_range').val();

// Find user location based on geolocalization from google
$('#findme_button').click(function() {
    $("#mainbox_postcode, .c_boxes").removeClass("missing_e");
    $.post(encodeURI("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBJuhJdmAIHpAnmB8Iz_SfURsbAIsmuSxo"))
        .done(function(data) {
            let geolocLong = data['location']['lng'];
            let geolocLat = data['location']['lat'];
            $.get(encodeURI("https://api.postcodes.io/postcodes?lon=" + geolocLong + "&lat=" + geolocLat))
                .done(function(data) {
                    let geolocPostcode = (data.result[0]['postcode']);
                    $("#mainbox_postcode").val(geolocPostcode);
                });
        });
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
    initMap();
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
    clubs_range = $('#clubs_dis_range').val();
    let pubs_range = $('#pubs_dis_range').val();
    let bars_range = $('#bars_dis_range').val();


    initMap();
});
// donwload trip screenshot 
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
$('#exit_icon, #sidebar_logo, #sidebar_logo_top').click(function() {
    $('#main_page_container').removeClass('hidden');
    $('#map_container').addClass('hidden');
    $('#footer_main').removeClass('hidden');
    $("#mainbox_postcode").val("");
});
// sweet alert for not valid postcode
function notValidPostcode() {
    Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Oops...',
        text: 'Please eneter valid postvode.',
        showConfirmButton: false,
        timer: 2000
    });
}
// postcode missing or not valid
function mainPostcodeError() {
    $("#mainbox_postcode").addClass("missing_e");
    $("#postcode_error").removeClass("hidden");
    $('html, body').animate({
        scrollTop: ($('#postcode_missing').offset().top)
    }, 500);
}

// sweet alert for geolocation error 
/*
function geolocationError() {
    Swal.fire({
        position: 'warning',
        type: 'error',
        title: 'Error..',
        text: 'Geolocation is not supported by this browser.',
        showConfirmButton: false,
        timer: 2000
    });
}*/


function initMap() {
    let map, service, infowindow;
    let postcodeValidation, myPostcode;
    let myPostCode, checked_clubs, checked_bars, checked_pubs;



    // MARKERS
    const marker_my_pos = {
        url: 'https://www.abovewave.kylos.pl/aclotrip_project/marker_mypos_white.png',
        scaledSize: new google.maps.Size(40, 64),
    };
    const marker_clubs_pos = {
        url: './assets/images/icons/marker_green.png',
        scaledSize: new google.maps.Size(28, 45),
    };
    const marker_pubs_pos = {
        url: './assets/images/icons/marker_orange.png',
        scaledSize: new google.maps.Size(28, 45),
    };
    const marker_bars_pos = {
        url: './assets/images/icons/marker_blue.png',
        scaledSize: new google.maps.Size(28, 45),
    };

    myPostCode = $("#mainbox_postcode").val();
    checked_clubs = $("#styled-checkbox-1").prop("checked");
    checked_bars = $("#styled-checkbox-3").prop("checked");
    checked_pubs = $("#styled-checkbox-2").prop("checked");

    if (myPostCode == "") {
        mainPostcodeError();
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
        myPostcode = $("#mainbox_postcode").val();
        myPostcode = myPostcode.replace(/\s/g, "");
        myPostcode = String(myPostcode.toUpperCase());

        //postcode validation
        event.preventDefault();
        $.get(encodeURI("https://api.postcodes.io/postcodes/" + myPostcode + "/validate"))
            .done(function(data) {

                postcodeValidation = data['result'];
                if (postcodeValidation) {
                    $("#postcode_sidebar").html(myPostcode);

                    // Variables
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
                                minZoom: 4, //10
                                center: myLocation,
                                mapTypeId: 'roadmap'
                            };

                            infowindow = new google.maps.InfoWindow();
                            // CREATING MAP WITH OPTIONS
                            map = new google.maps.Map(document.getElementById('map'),
                                mapOptions);


                            // CREATE CURRENT POSITION MARKER
                            let yourPosition = new google.maps.Marker({
                                icon: marker_my_pos,
                                position: myLocation,
                                animation: google.maps.Animation.DROP,
                                map: map,
                            });

                            //SHOW NAME FOR CURRENT POSITION MARKER IN BOX
                            google.maps.event.addListener(yourPosition, 'click', function() {
                                infowindow.setContent("You're here");
                                infowindow.open(map, this);
                            });

                            var request = {
                                location: myLocation,
                                radius: clubs_range,
                                query: 'night_club'
                            };

                            service = new google.maps.places.PlacesService(map);
                            service.textSearch(request, callback);

                            function callback(results, status) {
                                if (status == google.maps.places.PlacesServiceStatus.OK) {
                                    for (var i = 0; i < results.length; i++) {
                                        var place = results[i];
                                        createMarker(results[i]);
                                    }
                                }
                            }

                            function createMarker(place) {
                                var marker = new google.maps.Marker({
                                    map: map,
                                    icon: marker_bars_pos,
                                    animation: google.maps.Animation.Drop,
                                    position: place.geometry.location
                                });

                                google.maps.event.addListener(marker, 'click', function() {
                                    infowindow.setContent(place.name);
                                    infowindow.open(map, this);
                                });
                            }
                        });
                    // Go to Map
                    $("#main_page_container, #postcode_error, #tickbox_missing, #footer_main").addClass("hidden");
                    $("#map_container").addClass("map_main");
                    $("#map_container").removeClass("hidden");
                    $("#mainbox_postcode, .c_boxes").removeClass("missing_e");
                    $("#styled-checkbox-1 ,#styled-checkbox-2 ,#styled-checkbox-3").prop("checked", false);
                }
                else {
                    mainPostcodeError();
                    notValidPostcode();
                }
            });
    }
}
