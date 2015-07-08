var NApp = NApp || {};

var MapView = function() {
	var self = this;

    self.initialize = function() {
		NApp.map = new google.maps.Map(document.getElementById('map-canvas'), NApp.mapOption);
		NApp.infowindow = new google.maps.InfoWindow();

        var service = new google.maps.places.PlacesService(NApp.map);
		service.nearbySearch(NApp.mapRequest, self.callback);

	};


	self.callback = function(results, status) {
		if(status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				self.createMarker(results[i]);

			}
            NApp.mapMarker.push(results);
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


        google.maps.event.addListener(marker, 'click', function() {
            var placeName = place.name;
            var searchEntry = $('#wikiEntry');
            NApp.infowindow.setContent('<h3>'+ placeName +'</h3><p>'+ contentString +'</p>');
            NApp.infowindow.open(NApp.map, this);

            //When the marker is click, corresponding content will be display
            var searchUrl = 'http://api.duckduckgo.com/?q='+ placeName +'&format=json';
            $.ajax({
                url:searchUrl,
                async:true,
                dataType: "jsonp",
                success: function(response) {
                    var title = response.Heading;
                    var text = response.Abstract;
                    var img = response.Image;
                    searchEntry.html('');
                    searchEntry.append('<h3>'+ title +'</h3><div>'+ text +'<img src="'+ img +'" alt="wiki img"></div>');
                }
            })

        });

        google.maps.event.addListener(marker, 'click', function() {
            if (marker.getAnimation() != null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                //The star will keep bounce if we dont set time out
                setTimeout(function(){ marker.setAnimation(null); }, 750);
            }
        });
	};


    google.maps.event.addDomListener(window, 'load', self.initialize);
};

ko.applyBindings(MapView);