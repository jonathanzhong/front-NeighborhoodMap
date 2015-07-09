var NApp = NApp || {};

/**
 * render the location list to div and show the marker and information
 * when click on button.
 * @ViewModel
 */
var ViewModel = function() {
	var self = this;

    self.locationLists = ko.observableArray();
    self.locationListsAll = null;
    self.inputSearchBox = ko.observable('');
    self.locationListsNoMatch = ko.observable('false');

    /**
     * When button in the location list is clicked, show the marker and information.
     * @param data
     * @param event
     */



    self.buttonClickedShowMarker = function(data, event){
        NApp.MapView.searchLocation(data.name);
        NApp.MapView.deleteMarkers();

        var marker = NApp.MapView.createMarker(data);

        NApp.MapView.setMapCenter(data.geometry.location);
    };
    /**
     * Place Input Filter Function.
     * @param queryString
     */
    self.inputSearchBox.subscribe(function(data) {
        self.updateLocationLists(data);
    });

    self.updateLocationLists = function(queryString) {
        self.locationLists(self.locationListsAll);
        var originalArray = self.locationLists();
        var originalArrayLength = originalArray.length;

        var queryStringLowerCase = queryString.toLowerCase();
        var newArray = [];
        for (var i = 0; i < originalArrayLength; i++) {
            var nameLowerCase = originalArray[i].name.toLowerCase();
            if (nameLowerCase.indexOf(queryStringLowerCase) > -1) {
                newArray.push(originalArray[i]);
            }
        }
        self.searchPlaceNoMatch(newArray);
        self.locationLists(newArray);
    };

    self.searchPlaceNoMatch = function(dataArray) {
        self.locationListsNoMatch(dataArray.length === 0);
    };
};

$(window).load(function() {
    NApp.MapView = new MapView();
    NApp.ViewModel = new ViewModel();

    NApp.MapView.initialize();
    ko.applyBindings(NApp.ViewModel);
});