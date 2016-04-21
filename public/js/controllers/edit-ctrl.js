magenta.controller('EditCtrl', function($scope, $window, Planner, $routeParams) {

	$scope.title;
	$scope.description;
	$scope.guests = {};

	$scope.saveEvent = function() {
		console.log( [$scope.title, $scope.description, $scope.guests] );
		Planner.editEvent(Planner.currentEvent, $scope.title, $scope.description, $scope.guests);
    }

    $scope.removeEvent = function() {
    	Planner.deleteEvent(Planner.currentEvent);
    	$window.location.href = '/#/start-menu';
    }

    ;(function(){
    	console.log($routeParams);
    	var mEvent = Planner.getEvent($routeParams.eventID);
    	console.log(mEvent);
    	$scope.title = mEvent.name;
		$scope.description = mEvent.description;
		$scope.guests = mEvent.guests;
    })();
});
