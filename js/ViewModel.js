var app = app || {};

var ViewModel = function() {
	var self = this;

    self.locationList = ko.observableArray([]);
    self.inputBoxText = ko.observable('');
    
};

