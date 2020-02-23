/* global $, global Swal, google */
/* global, gLat, gLong */

/**
 * This function will collect geolocation data from google api - geolocation (after clicking FindMe button)
 * It creates two variables for lat and long
 */
$("#findme_button").click(function findMyPostcode() {
    $("#mainbox_postcode, .c_boxes").removeClass("missing_e");
    $.post(encodeURI("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBJuhJdmAIHpAnmB8Iz_SfURsbAIsmuSxo"))
        .done(function(data) {
            let geolocLong = data['location']['lng'];
            let geolocLat = data['location']['lat'];
            /**
             * This function will use postcodes.io to find postcode from passed variables
             */
            $.get(encodeURI("https://api.postcodes.io/postcodes?lon=" + geolocLong + "&lat=" + geolocLat))
                .done(function(data) {
                    /**
                     * Collect information from data result table
                     */
                    let geolocPostcode = data.result[0]['postcode'];
                    /**
                     * Passing variable to input box on main page
                     */
                    $("#mainbox_postcode").val(geolocPostcode);
                    $("#mainbox_postcode").removeClass("missing_e");
                    $("#postcode_error").addClass("hidden");
                });
        });

});
/**
 * This function will change checkbox property from true to false
 */
$('#unselect_all_checkbox').click(function() {
    $(".styled-checkbox").prop("checked", false);
    /**
     * Hide error message for mainbox postcode input field
     */
    $("#tickbox_missing").addClass("hidden");
    $(".c_boxes").removeClass("missing_e");
});
/**
 * This function will change checkbox property from false to true
 */
$('#select_all_checkbox').click(function() {
    $(".styled-checkbox").prop("checked", true);
    /**
     * Hide error message for all checkboxes
     */
    $("#tickbox_missing").addClass("hidden");
    $("#tickbox_missing").removeClass("text-muted1");
    $(".c_boxes").removeClass("missing_e");
});



/**
 * Input filed listener - if input field is empty don't show anything, else seelct all checkboxes and go to map page 
 */
$(document).on("keypress", "input", function(e) {
    if (e.which == 13) {
        $("#select_all_checkbox").click();
        initMap();
    }
});

$("#myButton").click(function() {
    alert("Button code executed.");
});


/**
 * On click function - run initMap function
 */
$("#start_trip_button").click(function() {
    initMap();
});
/**
 * This function will show allert popup box when postcode is not valid
 */
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
/**
 * This function will show error message below the postcode input field and scroll to the top
 */
function mainPostcodeError() {
    $("#mainbox_postcode").addClass("missing_e");
    $("#postcode_error").removeClass("hidden");
    $("html, body").animate({
        scrollTop: ($("#postcode_missing").offset().top)
    }, 500);
}
/**
 * On click function which will clear error message and style, when postcode input field is clicked
 */
$("#mainbox_postcode").click(function() {
    $("#mainbox_postcode").removeClass("missing_e");
    $("#postcode_error").addClass("hidden");
});
/**
 * Main function - initilize google maps with google places requests.
 * This function also changed website style to show map page
 */
function initMap() {
    let map, myLat, myLong, service, bounds, request_clubs, request_pubs, request_bars, yourPosition, infowindow, marker, myLocation, mapOptions, postcodeValidation, myPostcode, myPostCode, checked_clubs, checked_bars, checked_pubs, clubs_range, pubs_range, bars_range;
    /**
     * Sidebar range variables - converting miles to meters
     */
    clubs_range = ($('#clubs_dis_range').val() * 1609.344);
    pubs_range = ($('#pubs_dis_range').val() * 1609.344);
    bars_range = ($('#bars_dis_range').val() * 1609.344);
    /**
     * My Position marker icon
     */
    const marker_my_pos = {
        url: './assets/images/icons/marker_mypos_white.png',
        scaledSize: new google.maps.Size(40, 64),
    };
    /**
     * Clubs marker icon
     */
    const marker_clubs_pos = {
        url: './assets/images/icons/marker_red.png',
        scaledSize: new google.maps.Size(28, 45),
    };
    /**
     * Pubs marker icon
     */
    const marker_pubs_pos = {
        url: './assets/images/icons/marker_yellow.png',
        scaledSize: new google.maps.Size(28, 45),
    };
    /**
     * Bars marker icon
     */
    const marker_bars_pos = {
        url: './assets/images/icons/marker_blue.png',
        scaledSize: new google.maps.Size(28, 45),
    };
    /**
     * This variable is collecting value from mainbox postcode - postcode input on main page
     */
    myPostCode = $("#mainbox_postcode").val();
    /**
     * Checkbox variables - value of each checkbox from main page
     */
    checked_clubs = $("#clubs_checkbox").prop("checked");
    checked_pubs = $("#pubs_checkbox").prop("checked");
    checked_bars = $("#bars_checkbox").prop("checked");
    /**
     * If this statmenet is true, run main postcode error function
     * If myPostcode variable is blank run mainPostcodeError function
     */
    if (myPostCode == "") {
        mainPostcodeError();
    }
    /**
     * This statement will check, if any of checkboxes has value fals. If value is false, show erorr message and scroll to checkboxes
     */
    else if (checked_clubs == false && checked_pubs == false && checked_bars == false) {
        $("#tickbox_missing").removeClass("hidden");
        $(".c_boxes").addClass("missing_e");
        $("html, body").animate({
            scrollTop: ($("#tickbox_missing_err").offset().top)
        }, 500);
    }
    /**
     * If all required fields are not empty and all validation is correct run this part of code
     */
    else {
        /**
         * This code will pass postcode from postcode input, on main page, remove space and change it to uppercase letters
         */
        myPostcode = $("#mainbox_postcode").val();
        myPostcode = myPostcode.replace(/\s/g, "");
        myPostcode = String(myPostcode.toUpperCase());
        event.preventDefault();
        /**
         * Check if postcode is valid
         */
        $.get(encodeURI("https://api.postcodes.io/postcodes/" + myPostcode + "/validate"))
            .done(function(data) {
                /**
                 * This value is taking postcode value from postcodes.io api data encoding
                 */
                postcodeValidation = data['result'];
                /**
                 * This statement will check, if postcodeValidation variable is empty
                 */
                if (postcodeValidation) {
                    $("#postcode_sidebar").html(myPostcode);
                    /**
                     * Get the lattitude and longitude from postcodes.io api, if the find me button wasn't clicked and postcde vale is not empty 
                     */
                    $.get(encodeURI("https://api.postcodes.io/postcodes/" + myPostcode))
                        .done(function(data) {
                            /**
                             * Latitude and Longitude variables from postcodes.io api result table
                             */
                            myLat = data.result['latitude'];
                            myLong = data.result['longitude'];
                            /**
                             * My location variable for google maps
                             */
                            myLocation = { lat: myLat, lng: myLong };
                            /**
                             * Create variable for new google maps with my options
                             */
                            mapOptions = {
                                zoom: 10,
                                maxZoom: 18,
                                minZoom: 10,
                                center: myLocation,
                                mapTypeId: 'roadmap',
                            };
                            infowindow = new google.maps.InfoWindow();
                            /**
                             * Create maps with options
                             */
                            map = new google.maps.Map(document.getElementById('map'),
                                mapOptions);
                            /**
                             * Create variables for google places api service and bounds
                             */
                            service = new google.maps.places.PlacesService(map);
                            bounds = new google.maps.LatLngBounds();
                            /**
                             * Create your position marker and place it on the map 
                             */
                            yourPosition = new google.maps.Marker({
                                icon: marker_my_pos,
                                position: myLocation,
                                animation: google.maps.Animation.DROP,
                                map: map,
                            });
                            /** 
                             * Listener to show the label with the name for your position while marker clicked
                             */
                            google.maps.event.addListener(yourPosition, 'click', function() {
                                infowindow.setContent("You're here");
                                infowindow.open(map, this);
                            });
                            /**
                             * Clubs request variable with radius and location type
                             */
                            request_clubs = {
                                location: myLocation,
                                radius: clubs_range,
                                type: ['night_club']
                            };
                            /**
                             * Pubs request variable with radius and location type
                             */
                            request_pubs = {
                                location: myLocation,
                                radius: pubs_range,
                                type: ['pub']
                            };
                            /**
                             * Bars request variable with radius and location type
                             */
                            request_bars = {
                                location: myLocation,
                                radius: bars_range,
                                type: ['bar']
                            };
                            /**
                             * This function will create and add markers for NIGHT CLUBS request on map with fitting bounds
                             * @param places 
                             */
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
                            /**
                             * This function will create and add markers for PUBS request on map with fitting bounds
                             * @param places 
                             */
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
                            /**
                             * This function will create and add markers for BARS request on map with fitting bounds
                             * @param places 
                             */
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
                                /**
                                 * Fit map to bounds and center map including my location to bounds
                                 */
                                bounds.extend(myLocation);
                                map.fitBounds(bounds);
                            }
                            /**
                             * Perform nearby search function for night clubs, if night clubs checkbox value is true
                             */
                            if (checked_clubs == true) {
                                service.nearbySearch(request_clubs,
                                    function(results, status) {
                                        if (status !== 'OK') return;
                                        CreatClubMarkers(results);
                                    });
                                $("#clubs").css('opacity', '1');
                                $("#clubs_dis_range").removeAttr('disabled');
                            }
                            else {
                                $("#clubs").css('opacity', '0.3');
                                $("#clubs_dis_range").attr('disabled', 'true');
                            }
                            /**
                             * Perform nearby search function for pubs, if pubs checkbox value is true
                             */
                            if (checked_pubs == true) {
                                service.nearbySearch(request_pubs,
                                    function(results, status) {
                                        if (status !== 'OK') return;
                                        CreatPubMarkers(results);
                                    });
                                $("#pubs").css('opacity', '1');
                                $("#pubs_dis_range").removeAttr('disabled');
                            }
                            else {
                                $("#pubs").css('opacity', '0.3');
                                $("#pubs_dis_range").attr('disabled', 'true');
                            }
                            /**
                             * Perform nearby search function for bars, if bars checkbox  value is true
                             */
                            if (checked_bars == true) {
                                service.nearbySearch(request_bars,
                                    function(results, status) {
                                        if (status !== 'OK') return;
                                        CreatBarsMarkers(results);
                                    });
                                $("#bars").css('opacity', '1');
                                $("#bars_dis_range").removeAttr('disabled');
                            }
                            else {
                                $("#bars").css('opacity', '0.3');
                                $("#bars_dis_range").attr('disabled', 'true');
                            }
                        });
                    /**
                     * Chang style of main page to show map page
                     */
                    $(".main_hidden").addClass("hidden");
                    $("#map_container").addClass("map_main");
                    $("#map_container").removeClass("hidden");
                    $("show_map").removeClass("missing_e");
                }
                else {
                    /**
                     * Run main postcode error function, if postcodeValidation variable is empty
                     */
                    mainPostcodeError();
                    /**
                     * Run invalid postcode function, if postcodeValidation variable is empty
                     */
                    notValidPostcode();
                }
            });
    }
}
