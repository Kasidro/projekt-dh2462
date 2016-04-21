magenta.controller('EventCtrl', function($scope, $routeParams, Planner) {
	$scope.id = $routeParams.eventID;

	$scope.event = Planner.getEvent($scope.id);
});
