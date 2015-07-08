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
    self.inputBoxText = ko.observable('');


    self.updateLocationLists = function(queryString) {
        self.locationLists(self.locationListsAll);
        var originalArray = self.locationLists();
        var originalArrayLength = originalArray.length;

        var queryStringLowerCase = queryString.toLowerCase();
        var newArray = [];
        for (var i = 0; i < originalArrayLength; i++) {
            var nameLowerCase = originalArray[i].name.toLowerCase();
            if (nameLowerCase.indexof(queryStringLowerCase) > -1) {
                newArray.push(originalArray[i]);
            }
        }
        self.locationLists(newArray);
        console.log(self.locationLists);
    }
};

$(window).load(function() {
    NApp.MapView = new MapView();
    NApp.ViewModel = new ViewModel();

    NApp.MapView.initialize();
    ko.applyBindings(NApp.ViewModel);
});