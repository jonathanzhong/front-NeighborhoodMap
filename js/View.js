var NApp = NApp || {};

/**
 * Render google map, markers and search information to the page.
 * @MapView
 */

var MapView = function() {
	var self = this;


    /**
     * initial map
     */
    self.initialize = function() {
		NApp.map = new google.maps.Map(document.getElementById('map-canvas'), NApp.mapOption);
		NApp.infowindow = new google.maps.InfoWindow();

        var service = new google.maps.places.PlacesService(NApp.map);
		service.nearbySearch(NApp.mapRequest, self.callback);

	};


	self.callback = function(results, status) {
		if(status == google.maps.places.PlacesServiceStatus.OK) {
            NApp.mapMarker.push(results);

            //it is an array inside of an array.
            NApp.markerLocations = NApp.mapMarker[0];

			for (var i = 0, len = results.length; i < len; i++) {
				self.createMarker(NApp.markerLocations[i]);
			}

            NApp.ViewModel.locationLists(NApp.markerLocations);
            //console.log(NApp.ViewModel.locationLists());
            NApp.ViewModel.locationListsAll = results;

		}
	};


	self.createMarker = function(place) {
		var input = place.geometry.location;
        var contentString = place.vicinity;


        var marker = new google.maps.Marker({
            map: NApp.map,
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

        NApp.markers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
            var placeName = place.name;
            NApp.infowindow.setContent('<h3>'+ placeName +'</h3><p>'+ contentString +'</p>');
            NApp.infowindow.open(NApp.map, this);

            //When the marker is click, corresponding content will be display
            self.searchLocation(placeName);

            // marker bounce when clicked
            if (marker.getAnimation() != null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                //The star will keep bounce if we dont set time out
                setTimeout(function(){ marker.setAnimation(null); }, 750);
            }


        });
    };


    // Implement duckduckgo API to get information about the location
    self.searchLocation = function(placeName) {
        var searchEntry = $('#wikiEntry');
        var searchUrl = 'http://api.duckduckgo.com/?q='+ placeName +'&format=json';
        var searchRequestTimeout = setTimeout(function() {
            searchEntry.text("fail to get related information");
        }, 8000);

        $.ajax({
            url:searchUrl,
            async:true,
            dataType: "jsonp",
            success: function(response) {
                //console.log(response);
                var title = response.Heading;
                var text = response.Abstract;
                var img = response.Image;
                searchEntry.html('');
                if (title.length === 0 || img.length === 0) {
                    searchEntry.append('<h3>Sorry! There is no related information.</h3>');
                } else {
                    searchEntry.append('<h3>'+ title +'</h3><div>'+ text +'<img src="'+ img +'" alt="wiki img"></div>');
                }
                clearTimeout(searchRequestTimeout);
            },
            error: function() {
                alert("error");
            }
        });
    };


    self.setAllMap = function(map) {
        for (var i = 0; i < NApp.markers.length; i++) {
            NApp.markers[i].setMap(map);
        }
    };
    //Removes the markers from the map, but keeps them in the array.
    self.clearMarkers = function() {
        self.setAllMap(null);
    };
    //Deletes all markers in the array by removing references to them.
    self.deleteMarkers = function() {
        self.clearMarkers();
        NApp.markers = new Array();
    };

    self.setMapCenter = function(location) {
        NApp.map.setCenter(location);
        NApp.map.panBy(0, 150);
    };

    //Responsive map with JavaScript;
    google.maps.event.addDomListener(window, 'resize', self.initialize);
    google.maps.event.addDomListener(window, 'load', self.initialize);
};