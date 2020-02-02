/* global $, global Swal, google */
/* global, gLat, gLong */

// Find user location based on geolocalization from google
$('#findme_button').click(function findMyPostcode() {
    $("#mainbox_postcode, .c_boxes").removeClass("missing_e");
    $.post(encodeURI("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBJuhJdmAIHpAnmB8Iz_SfURsbAIsmuSxo"))
        .done(function(data) {
            let geolocLong = data['location']['lng'];
            let geolocLat = data['location']['lat'];
            $.get(encodeURI("https://api.postcodes.io/postcodes?lon=" + geolocLong + "&lat=" + geolocLat))
                .done(function(data) {
                    let geolocPostcode = data.result[0]['postcode'];
                    $("#mainbox_postcode").val(geolocPostcode);
                });
        });
});

// Clear all checboxes and hidden error message
$('#unselect_all_checkbox').click(function() {
    $(".styled-checkbox").prop("checked", false);
    // clear errors
    $("#tickbox_missing").addClass("hidden");
    $(".c_boxes").removeClass("missing_e");
});
// Select all checboxes and clear hidden error message
$('#select_all_checkbox').click(function() {
    $(".styled-checkbox").prop("checked", true);
    // clear errors
    $("#tickbox_missing").addClass("hidden");
    $("#tickbox_missing").removeClass("text-muted1");
    $(".c_boxes").removeClass("missing_e");
});

// START BUTTON - MAIN PAGE - RUN MAIN SCRIPT
$('#start_trip_button').click(function() {
    initMap();
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

function initMap() {
    let map, myLat, myLong, service, bounds, request_clubs, request_pubs, request_bars, yourPosition, infowindow, marker, myLocation, mapOptions, postcodeValidation, myPostcode, myPostCode, checked_clubs, checked_bars, checked_pubs, clubs_range, pubs_range, bars_range;

    // CALUCLATIONS FOR GOOGLE PLACES API - CONVERT MILES TO METERS
    clubs_range = ($('#clubs_dis_range').val() * 1609.344);
    pubs_range = ($('#pubs_dis_range').val() * 1609.344);
    bars_range = ($('#bars_dis_range').val() * 1609.344);

    // MY LOCATION MARKER ICON
    const marker_my_pos = {
        url: './assets/images/icons/marker_mypos_white.png',
        scaledSize: new google.maps.Size(40, 64),
    };

    // CLUBS MARKER ICON
    const marker_clubs_pos = {
        url: './assets/images/icons/marker_red.png',
        scaledSize: new google.maps.Size(28, 45),
    };

    // PUBS MARKER ICON
    const marker_pubs_pos = {
        url: './assets/images/icons/marker_yellow.png',
        scaledSize: new google.maps.Size(28, 45),
    };

    // BARS MARKER ICON
    const marker_bars_pos = {
        url: './assets/images/icons/marker_blue.png',
        scaledSize: new google.maps.Size(28, 45),
    };

    // POSTCODE VALUE
    myPostCode = $("#mainbox_postcode").val();

    // CHECKBOXES VALUE FROM MAIN PAGE AS BOOOLEAN
    checked_clubs = $("#clubs_checkbox").prop("checked");
    checked_bars = $("#pubs_checkbox").prop("checked");
    checked_pubs = $("#bars_checkbox").prop("checked");

    // MAIN STATEMENT - IF POSTCODE IS MISSING SHOW ERROR MESSAGE
    if (myPostCode == "") {
        mainPostcodeError();
    }
    // CHECK IF ANY CHECKBOX IS TICKED - IF NOT SHOW ERROR MESSAGE
    else if (checked_clubs == false && checked_pubs == false && checked_bars == false) {
        $("#tickbox_missing").removeClass("hidden");
        $(".c_boxes").addClass("missing_e");
        $('html, body').animate({
            scrollTop: ($('#tickbox_missing_err').offset().top)
        }, 500);
    }
    // IF ALL REQUIERD FIELDS ARE CHECKED AND HAVE VALUES DO THIS CODE
    else {

        // PASS VALUE FROM MAIN PAGE POSTCODE FILED TO H3 SELECTOR IN SIDEBAR
        myPostcode = $("#mainbox_postcode").val();
        myPostcode = myPostcode.replace(/\s/g, "");
        myPostcode = String(myPostcode.toUpperCase());

        // USE POSTCODE.IO TO VALIDAE POSTCDE INFORMATION
        event.preventDefault();
        $.get(encodeURI("https://api.postcodes.io/postcodes/" + myPostcode + "/validate"))
            .done(function(data) {

                // GET THE DATA FROM POSTCODE.IO RESULT 
                postcodeValidation = data['result'];

                // 
                if (postcodeValidation) {
                    $("#postcode_sidebar").html(myPostcode);

                    // GET LATITUDE AND LONGITUDE FROM POSTCODE.IO
                    $.get(encodeURI("https://api.postcodes.io/postcodes/" + myPostcode))
                        .done(function(data) {

                            // LAT AND LONG VARIABLES
                            myLat = data.result['latitude'];
                            myLong = data.result['longitude'];

                            // CREATE MY LOCATION VARIABLE
                            myLocation = { lat: myLat, lng: myLong };
                            // NEW MAP OPTIONS
                            mapOptions = {
                                zoom: 10,
                                maxZoom: 18,
                                minZoom: 10,
                                center: myLocation,
                                mapTypeId: 'roadmap',
                            };

                            infowindow = new google.maps.InfoWindow();

                            // CREATING MAP WITH OPTIONS
                            map = new google.maps.Map(document.getElementById('map'),
                                mapOptions);

                            // CREATE GOOGLE PLACES API SERVICE AND BOUNDS
                            service = new google.maps.places.PlacesService(map);
                            bounds = new google.maps.LatLngBounds();

                            // CREATE CURRENT POSITION MARKER VARIABLE
                            yourPosition = new google.maps.Marker({
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

                            // CLUBS, PUBS AND BARS REQUESTS - VARIABLES
                            request_clubs = {
                                location: myLocation,
                                radius: [clubs_range],
                                type: ['night_club']
                            };
                            request_pubs = {
                                location: myLocation,
                                radius: [pubs_range],
                                type: ['pub']
                            };
                            request_bars = {
                                location: myLocation,
                                radius: [bars_range],
                                type: ['bar']
                            };

                            // CREATE CLUBS MARKERS
                            function CreatClubMarkers(places) {
                                for (let i = 0, place; place = places[i]; i++) {
                                    marker = new google.maps.Marker({
                                        map: map,
                                        icon: marker_clubs_pos,
                                        title: place.name,
                                        animation: google.maps.Animation.DROP,
                                        position: place.geometry.location
                                    });
                                    google.maps.event.addListener(marker, 'click', function() {
                                        infowindow.setContent(place.name);
                                        infowindow.open(map, this);
                                    });
                                    bounds.extend(place.geometry.location);
                                }
                                bounds.extend(myLocation);
                                map.fitBounds(bounds);
                            }

                            // CREATE PUBS MARKERS
                            function CreatPubMarkers(places) {
                                for (let i = 0, place; place = places[i]; i++) {
                                    marker = new google.maps.Marker({
                                        map: map,
                                        icon: marker_pubs_pos,
                                        title: place.name,
                                        animation: google.maps.Animation.DROP,
                                        position: place.geometry.location
                                    });
                                    google.maps.event.addListener(marker, 'click', function() {
                                        infowindow.setContent(place.name);
                                        infowindow.open(map, this);
                                    });
                                    bounds.extend(place.geometry.location);
                                }
                                bounds.extend(myLocation);
                                map.fitBounds(bounds);
                            }

                            // CREATE BARS MARKERS
                            function CreatBarsMarkers(places) {
                                for (let i = 0, place; place = places[i]; i++) {
                                    marker = new google.maps.Marker({
                                        map: map,
                                        icon: marker_bars_pos,
                                        title: place.name,
                                        animation: google.maps.Animation.DROP,
                                        position: place.geometry.location
                                    });
                                    google.maps.event.addListener(marker, 'click', function() {
                                        infowindow.setContent(place.name);
                                        infowindow.open(map, this);
                                    });
                                    bounds.extend(place.geometry.location);
                                }

                                // FIT MAP TO BOUNDS AND CENTER INCLUDING MY LOCATION
                                bounds.extend(myLocation);
                                map.fitBounds(bounds);
                            }

                            // PERFORM A NEARBY SEARACH FOR CLUBS
                            service.nearbySearch(request_clubs,
                                function(results, status) {
                                    if (status !== 'OK') return;
                                    CreatClubMarkers(results);
                                });
                            // PERFORM A NEARBY SEARACH FOR PUBS
                            service.nearbySearch(request_pubs,
                                function(results, status) {
                                    if (status !== 'OK') return;
                                    CreatPubMarkers(results);
                                });
                            // PERFORM A NEARBY SEARACH FOR BARS
                            service.nearbySearch(request_bars,
                                function(results, status) {
                                    if (status !== 'OK') return;
                                    CreatBarsMarkers(results);
                                });
                        });
                    // GO TO THE MAIN PAGE
                    $("#main_page_container, #postcode_error, #tickbox_missing, #footer_main").addClass("hidden");
                    $("#map_container").addClass("map_main");
                    $("#map_container").removeClass("hidden");
                    $("#mainbox_postcode, .c_boxes").removeClass("missing_e");
                    //$("#styled-checkbox-1 ,#styled-checkbox-2 ,#styled-checkbox-3").prop("checked", false);
                }
                else {
                    // SHOW POSTCODE ERROR
                    mainPostcodeError();
                    // SHOW INVALID POSTCODE ERROR
                    notValidPostcode();
                }
            });
    }
}
