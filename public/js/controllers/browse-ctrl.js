magenta.controller('BrowseCtrl', function($scope, Planner) {

		console.log(Planner.getEvents());
		$scope.events = Planner.getEvents();

});
