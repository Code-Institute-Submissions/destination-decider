//SETTING DEFAULT VARS

var infowindow;

var markers = [];
var restaurantMarkers = [];
var lodgingMarkers = [];
var touristMarkers = [];


//FUNCTION TO DELETE MARKERS AND RESET ARRAYS

function DeleteMarkers() {

    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }

    for (var i = 0; i < restaurantMarkers.length; i++) {
        restaurantMarkers[i].setMap(null);
    }

    for (var i = 0; i < lodgingMarkers.length; i++) {
        lodgingMarkers[i].setMap(null);
    }

    for (var i = 0; i < touristMarkers.length; i++) {
        touristMarkers[i].setMap(null);
    }
    markers = [];
    restaurantMarkers = [];
    lodgingMarkers = [];
    touristMarkers = [];

};


// FUNCTION TO HIDE MARKERS / TOGGLE IF  THEY DISPLAYED ON MAP




// GOOGLE MAP FUNCTIONS


function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: { // create map
            lat: 46.619261,
            lng: -33.134766
        }
    });


    var marker;
    var callCounter = 0;


    // CREATE MARKERS FOR PICKED CITY / ZOOM IN TO LOCATION

    function createMarker(results) {

        marker = new google.maps.Marker({
            position: results.geometry.location, // createMarker function created for use in callback function to make marker on the picked city
            map: map,

        });
        markers.push(marker); // push marker to markers array
        map.setZoom(13);
        map.panTo(marker.position); // zoom in on location of the result
    }


    // CREATE MARKERS FOR RESTAURANTS

    function createMarkerRestaurant(results) { // create marker for cafes



        var restaurantIcon = {
            url: "assets/images/restaurantmarker.png",
            scaledSize: new google.maps.Size(50, 50), // Icon for Cafe's 
        };

        marker = new google.maps.Marker({
            position: results.geometry.location, // Making the marker 
            map: map,
            animation: google.maps.Animation.DROP,
            icon: restaurantIcon

        });

        google.maps.event.addListener(marker, 'click', function() { // open infowindow upon clicking the marker

            if (infowindow != null) {
                infowindow.close() // close any other infowindows first
            }
            infowindow = new google.maps.InfoWindow({
                content: results.name + '<br/>' + '<a href="https://www.google.com/maps/search/?api=1&query=' + results.name + '&query_place_id=' + results.place_id + '" target="_blank">Open on Google Maps</a>'

            }); // initialize infowindow functionality
            infowindow.open(map, this);
        });
        restaurantMarkers.push(marker); // push markers to restaurantMarkers array


    }


    // CREATE MARKERS FOR HOTELS

    function createMarkerLodging(results) { // create marker for Hotels



        var lodgingIcon = {
            url: "assets/images/hotelmarker.png",
            scaledSize: new google.maps.Size(50, 50), // Icon for Hotels
        };

        marker = new google.maps.Marker({
            position: results.geometry.location, // make the hotel markers
            map: map,
            animation: google.maps.Animation.DROP,
            icon: lodgingIcon

        });

        google.maps.event.addListener(marker, 'click', function() { // open infowindow upon clicking the marker

            if (infowindow != null) {
                infowindow.close() // close any other infowindows first
            }

            infowindow = new google.maps.InfoWindow({
                content: results.name + '<br/>' + '<a href="https://www.google.com/maps/search/?api=1&query=' + results.name + '&query_place_id=' + results.place_id + '" target="_blank">Open on Google Maps</a>'

            }); // initialize infowindow functionality
            infowindow.open(map, this);
        });

        lodgingMarkers.push(marker); // push markers to lodgingMarkers array

    }


    // CREATE MARKERS FOR TOURIST ATTRACTIONS

    function createMarkerTourist(results) {



        var touristIcon = {
            url: "assets/images/touristmarker.png",
            scaledSize: new google.maps.Size(50, 50), // Icon for Tourist
        };

        marker = new google.maps.Marker({
            position: results.geometry.location, // make the tourist markers
            map: map,
            animation: google.maps.Animation.DROP,
            icon: touristIcon

        });



        google.maps.event.addListener(marker, 'click', function() { // open infowindow upon clicking the marker

            if (infowindow != null) {
                infowindow.close() // close any other infowindows first
            }

            infowindow = new google.maps.InfoWindow({
                content: results.name + '<br/>' + '<a href="https://www.google.com/maps/search/?api=1&query=' + results.name + '&query_place_id=' + results.place_id + '" target="_blank">Open on Google Maps</a>'

            }); // initialize infowindow functionality
            infowindow.open(map, this);
        });

        touristMarkers.push(marker); // push markers to touristMarkers array

    }


    // RESET BUTTON


    $("#reset").click(function() {
        DeleteMarkers();
        map.setZoom(3);
        map.setCenter({ // reset button to reset position on map
            lat: 46.619261,
            lng: -33.134766
        })
    });




    // RANDOM BUTTON

    service = new google.maps.places.PlacesService(map);


    // disable button for 3 seconds to prevent users spamming and breaking the site

    function disableButton(button) {
        button.disabled = true;
        setTimeout(function() {
            button.disabled = false;
        }, 3000);
    }


    $("#random").click(function() {

        DeleteMarkers();
        disableButton(this);

        setDropdownsRandom().then(function() {
            console.log("now do this");

            var randomCity = $("#city-dropdown").text();
            console.log("random", randomCity); // places marker at random location when 'random' button is clicked

            var randomLocation = {
                query: randomCity,
                fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
            }

            service.findPlaceFromQuery(randomLocation, callback);
        });

    });


    // SEARCH BAR BUTTON

    $("#searchButton").on("click", function() {
        event.preventDefault(); // stops search button reloading page on click
        resetDropdowns();
        DeleteMarkers();
        var searchbarText = $("#search").val();

        var searchedLocation = {
            query: searchbarText,
            fields: ['geometry'],

        }

        service.findPlaceFromQuery(searchedLocation, callback);


    });



    // CITY DROPDOWN CHANGING 


    $(cityDropdown).on("change", function() { // upon changing cityDropdown, this grabs your selection and puts a marker on it

        DeleteMarkers();
        $("#city-dropdown").prop("disabled", true);

        var desiredLocation = {
            query: cityDropdown.val(),
            fields: ['geometry'],

        }

        console.log(map.getCenter().lat(), map.getCenter().lng());

        service.findPlaceFromQuery(desiredLocation, callback);

    });


    //CALLBACK FUNCTIONS FOR nearbyPlaces SEARCHES

    function callback(results, status) {
        console.log("results", results);
        callCounter = 0;
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                if (marker != undefined) {
                    marker.setMap(null);
                }
                createMarker(results[i]);
            }

            var nearbyRestaurant = {
                location: { lat: map.getCenter().lat(), lng: map.getCenter().lng() }, //using latLng of the map center, after map zooms in on selected city
                radius: '5000',
                type: ['restaurant'],
            }

            service.nearbySearch(nearbyRestaurant, callbackRestaurant);

            var nearbyLodging = {
                location: { lat: map.getCenter().lat(), lng: map.getCenter().lng() }, //using latLng of the map center, after map zooms in on selected city
                radius: '5000',
                type: ['lodging'],
            }

            service.nearbySearch(nearbyLodging, callbackLodging);


            // TOURIST SEARCHES


            var nearbyZoo = {
                location: { lat: map.getCenter().lat(), lng: map.getCenter().lng() }, //using latLng of the map center, after map zooms in on selected city
                radius: '10000',
                type: ['zoo'], // google api only supports filtering for one  type at a time. Using several vars for different types of tourist attraction and then using
                // callbackTourist to place markers on them.
            }


            var nearbyCinema = {
                location: { lat: map.getCenter().lat(), lng: map.getCenter().lng() }, //using latLng of the map center, after map zooms in on selected city
                radius: '10000',
                type: ['movie_theater'], // google api only supports filtering for one  type at a time. Using several vars for different types of tourist attraction and then using
                // callbackTourist to place markers on them.
            }



            var nearbyAmusementPark = {
                location: { lat: map.getCenter().lat(), lng: map.getCenter().lng() }, //using latLng of the map center, after map zooms in on selected city
                radius: '10000',
                type: ['amusement_park'], // google api only supports filtering for one  type at a time. Using several vars for different types of tourist attraction and then using
                // callbackTourist to place markers on them.
            }

            var nearbyCasino = {
                location: { lat: map.getCenter().lat(), lng: map.getCenter().lng() }, //using latLng of the map center, after map zooms in on selected city
                radius: '10000',
                type: ['casino'], // google api only supports filtering for one  type at a time. Using several vars for different types of tourist attraction and then using
                // callbackTourist to place markers on them.
            }

            var nearbyMuseum = {
                location: { lat: map.getCenter().lat(), lng: map.getCenter().lng() }, //using latLng of the map center, after map zooms in on selected city
                radius: '10000',
                type: ['museum'], // google api only supports filtering for one  type at a time. Using several vars for different types of tourist attraction and then using
                // callbackTourist to place markers on them.
            }

            service.nearbySearch(nearbyZoo, callbackTourist);
            service.nearbySearch(nearbyCinema, callbackTourist);
            service.nearbySearch(nearbyAmusementPark, callbackTourist);
            service.nearbySearch(nearbyCasino, callbackTourist);
            service.nearbySearch(nearbyMuseum, callbackTourist);

        }
    }

    function callbackRestaurant(results, status) {
        console.log("restaurant results", results);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var placeRestaurant = results[i];


                createMarkerRestaurant(results[i]);


            }

        }
        checkCallCounter();
    }

    function callbackLodging(results, status) {
        console.log("lodging results", results);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var placeLodging = results[i];

                createMarkerLodging(results[i]);

            }

        }
        checkCallCounter();
    }

    function callbackTourist(results, status) {
        console.log("tourist results", results);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var placeTourist = results[i];

                createMarkerTourist(results[i]);
            }
        }
        checkCallCounter();
    }


    // TOGGLE MARKER BUTTON FUNCTIONS 

    function toggleMarkers(array) {
        for (var i = 0; i < array.length; i++) {
            array[i].setMap(null);
        }
    }

    function showMarkers(array) {
        for (var i = 0; i < array.length; i++) {
            array[i].setMap(map);
        }
    }

    function checkCallCounter() {
        callCounter += 1
        if (callCounter == 7) {
            console.log("all calls are done");
            $("#city-dropdown").prop("disabled", false);

        }
    }

    // RESTAURANT MARKER TOGGLES

    $('#restaurantHide').on("click", function() {

        toggleMarkers(restaurantMarkers);
    });

    $('#restaurantShow').on("click", function() {

        showMarkers(restaurantMarkers);
    });

    // HOTEL MARKER TOGGLES

    $('#hotelHide').on("click", function() {

        toggleMarkers(lodgingMarkers);
    });

    $('#hotelShow').on("click", function() {

        showMarkers(lodgingMarkers);
    });

    // TOURIST ATTRACTION TOGGLES

    $('#touristHide').on("click", function() {

        toggleMarkers(touristMarkers);
    });

    $('#touristShow').on("click", function() {

        showMarkers(touristMarkers);
    });

}
