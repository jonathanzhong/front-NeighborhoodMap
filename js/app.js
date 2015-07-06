/**
 * Created by yonglin1 on 7/6/15.
 */
function initialize() {
    var location0 = new google.maps.LatLng(37.779390, -122.419108);
    var location1 = new google.maps.LatLng(37.778612, -122.389238);
    var mapOptions = {
        center: location0,
        zoom: 13
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    var contentString0 = '<h3>San Fancisco City Hall</h3><p>1 Doctor Carlton B Goodlett Place, San Francisco, CA</p>';
    var infowindow0 = new google.maps.InfoWindow({
        content: contentString0
    });
    var marker0 = new google.maps.Marker ({
        position: location0,
        animation: google.maps.Animation.DROP,
        map: map,
        title: 'San Francisco City Hall'
    });
    var contentString1 = '<h3>AT&T Park</h3><p>24 Willie Mays Plaza, San Francisco, CA</p>';
    var marker1 = new google.maps.Marker({
        position: location1,
        animation: google.maps.Animation.DROP,
        map: map,
        title: 'AT&T Park'
    });
    var infowindow1 = new google.maps.InfoWindow({
        content: contentString1
    });
    google.maps.event.addListener(marker0, 'click', function() {
        infowindow0.open(map,marker0);
    });
    google.maps.event.addListener(marker1, 'click', function() {
        infowindow1.open(map,marker1);
    });

}
google.maps.event.addDomListener(window, 'load', initialize);

$(function loadData() {
    var wikiEntry = $('#wikiEntry');
    var location0= "San%20Francisco%20City%20Hall";
    var wikiUrl = 'http://api.duckduckgo.com/?q='+ location0 +'&format=json';
    $.ajax({
        url:wikiUrl,
        async:true,
        dataType: "jsonp",
        success: function(response) {
            console.log(response);
            var title = response.Heading;
            var text = response.Abstract;
            var img = response.Image;
            wikiEntry.append('<h3>'+ title +'</h3><div>'+ text +'<img src="'+ img +'" alt="wiki img"></div>');
        }
    })
})