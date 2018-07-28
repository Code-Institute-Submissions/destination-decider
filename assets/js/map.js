function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: { // create map
            lat: 46.619261,
            lng: -33.134766
        }
    });


    var marker;

    function createMarker(results) {

        marker = new google.maps.Marker({
            position: results.geometry.location, // createMarker function created for use in callback function
            map: map
        });

        map.setZoom(10);
        map.panTo(marker.position); // zoom in on location of the result
    }

    $("#reset").click(function() {
        marker.setMap(null)
        map.setZoom(3);
        map.setCenter({ // reset button to reset position on map
            lat: 46.619261,
            lng: -33.134766
        })
    });




    service = new google.maps.places.PlacesService(map);



    $("#random").click(function() {

        var randomCity = $("#city-dropdown").text();
        console.log("random", randomCity); // places marker at random location when 'random' button is clicked

        var randomLocation = {
            query: randomCity,
            fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
        }

        service.findPlaceFromQuery(randomLocation, callback);
        
    });


    $("#searchButton").on("click", function() {
        event.preventDefault(); // stops search button reloading page on click

        var searchbarText = $("#search").val();

        var searchedLocation = {
            query: searchbarText,
            fields: ['geometry'],
            
        }

        service.findPlaceFromQuery(searchedLocation, callback);
        
    });





    $(cityDropdown).on("change", function() { // upon changing cityDropdown, this grabs your selection and puts a marker on it
        var desiredLocation = {
            query: cityDropdown.val(),
            fields: ['geometry'],
            
        }
        
        
        
        var nearbyStuff = {
            location: {lat:map.getCenter().lat(), lng: map.getCenter().lng()}, //using latLng of the map center, after map zooms in on selected city
            radius: '5000',
            type: ['zoo'], 
        }
        
        console.log(map.getCenter().lat(),map.getCenter().lng());
        
        service.nearbySearch(nearbyStuff, callback);
        service.findPlaceFromQuery(desiredLocation, callback);
        
    });


    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                if (marker != undefined) {
                    marker.setMap(null);
                }
                createMarker(results[i]);
                
            }
        }
    }
}
