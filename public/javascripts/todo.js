/**
 * Created by shubh on 15/1/16.
 */


jQuery('#datetimepicker').datetimepicker({

    timepicker:true,
    formatDate:'Y/m/d',
    minDate:'-1970/01/01',//yesterday is minimum date(for today use 0 or -1970/01/01)
});





function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

                var geocoder = new google.maps.Geocoder();
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                var latlng = new google.maps.LatLng(lat, lng);

                console.log(geocoder);
                console.log(position);

                //reverse geocode the coordinates, returning location information.
                geocoder.geocode({'latLng': latlng}, function (results, status) {
                    var result = results[0];
                    var state = '';
                    var bc='';
                    for (var i = 0, len = result.address_components.length; i < len; i++) {
                        if(result.address_components[i].long_name.split(" ")[0]!="Unnamed") {
                            bc = bc + " " + result.address_components[i].long_name;
                            ac = result.address_components[i];
                            console.log(ac);
                        }

                    }

                    document.getElementById('pac-input').value=bc;

                });
            }

            , function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // [START region_getplaces]
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

