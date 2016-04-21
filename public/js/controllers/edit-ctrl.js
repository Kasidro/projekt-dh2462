magenta.controller('EditCtrl', function($scope, $window, Planner) {

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
    	var currentEvent = Planner.getEvent(Planner.currentEvent);
    	console.log(currentEvent);
    	$scope.title = currentEvent.title;
		$scope.description = currentEvent.description;
		$scope.guests = currentEvent.guests;
    })();
});
