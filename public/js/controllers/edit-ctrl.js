magenta.controller('EditCtrl', function($scope, $window, Planner, $routeParams) {

	$scope.title;
	$scope.description;
	$scope.guests = {};

	$scope.saveEvent = function() {
		Planner.editEvent($routeParams.eventID, $scope.title, $scope.description, $scope.guests);
        $window.location.href = '/#/event/' + $routeParams.eventID;
    }

    $scope.removeEvent = function() {
    	Planner.deleteEvent($routeParams.eventID);
    	$window.location.href = '/#/start-menu';
    }

    ;(function(){
    	var mEvent = Planner.getEvent($routeParams.eventID);
    	$scope.title = mEvent.name;
		$scope.description = mEvent.description;
		$scope.guests = mEvent.guests;
    })();
});
