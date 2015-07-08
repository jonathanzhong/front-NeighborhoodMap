/**
 * Created by yonglin on 7/6/15.
 */
var map;
var infowindow;
var service;
var geocoder = new google.maps.Geocoder();

function initialize() {
    var location = new google.maps.LatLng(37.779179, -122.419649);

    var mapOptions = {
        center: location,
        zoom: 14,
        styles: [
            {
                stylers: [
                    { visibility: 'simplified' }
                ]
            },
            {
                elementType: 'labels',
                stylers: [
                    { visibility: 'off' }
                ]
            }
        ]
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var request = {
        location: location,
        radius:'3000',
        type: ['store']
    };

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

}


function callback(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
        console.log(results);
    }
}


function createMarker(place) {

    var input = place.geometry.location;

    var contentString;
    geocoder.geocode({'location': input}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                contentString = results[1].formatted_address;
                return contentString;
            } else {
                window.alert('No results found');
            }
        } else {
            if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                wait = true;
                setTimeout("wait = true", 2000);
            } else {
                var reason="Code "+status;
                var msg = 'address="' + search + '" error=' +reason+ '(delay='+delay+'ms)<br>';
                document.getElementById("messages").innerHTML += msg;
            }
        }
    });

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        animation: google.maps.Animation.DROP,
        icon: {
            // Star
            path: 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7 z',
            fillColor: '#ffff00',
            fillOpacity: 1,
            scale: 2/4,
            strokeColor: '#bd8d2c',
            strokeWeight: 1
        }
    });

    google.maps.event.addListener(marker, 'click', function() {
        var placeName = place.name;
        var searchEntry = $('#wikiEntry');

        var searchUrl = 'http://api.duckduckgo.com/?q='+ placeName +'&format=json';
        infowindow.setContent('<h3>'+ placeName +'<p>'+ contentString +'</p></h3>');
        infowindow.open(map, this);
        $.ajax({
            url:searchUrl,
            async:true,
            dataType: "jsonp",
            success: function(response) {
                console.log(response);
                var title = response.Heading;
                var text = response.Abstract;
                var img = response.Image;
                searchEntry.html('');
                searchEntry.append('<h3>'+ title +'</h3><div>'+ text +'<img src="'+ img +'" alt="wiki img"></div>');
            }
        })

    });
}

console.log(google.maps);


google.maps.event.addDomListener(window, 'load', initialize);