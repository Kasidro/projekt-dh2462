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
});
