magenta.controller('BrowseCtrl', function($scope, Planner) {

		
		$scope.events = Planner.getEvents();

});
