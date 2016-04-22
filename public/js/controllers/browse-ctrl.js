magenta.controller('BrowseCtrl', function($scope, $window, Planner) {
		
		$scope.events = Planner.getEvents();

		$scope.gotoEdit = function(eventId) {
			Planner.setCurrentEvent(eventId);
			$window.location.href = '/#/edit-event';
		};

		$scope.gotoDetails = function(eventId) {
			Planner.setCurrentEvent(eventId);
			$window.location.href = '/#/event-details';
		};

		$scope.shortenTitle = function(name) {
			if (typeof name !== 'undefined' && name.length > 20) {
				name = name.substring(0,20);
				name = name + "..";
			}
			return name;
		}
});
