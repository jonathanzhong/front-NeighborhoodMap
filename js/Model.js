var NApp = NApp || {};


/**
 * Map objects
 */
NApp.map;
NApp.mapCenterlocation = new google.maps.LatLng(37.779179, -122.419649);
NApp.geocoder = new google.maps.Geocoder();
NApp.mapOption = {
    center: NApp.mapCenterlocation,
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
NApp.mapRequest = {
    location: NApp.mapCenterlocation,
    radius:'3000',
    type: ['neighborhood']
};
NApp.mapMarker = [];
NApp.markers = [];
NApp.markerLocations = null;
NApp.infowindow;