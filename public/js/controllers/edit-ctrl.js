magenta.controller('EditCtrl', function($scope, $window, Planner, $routeParams) {

	$scope.title;
	$scope.description;
    $scope.friends = Planner.getFriends();
	$scope.guests = [];
    $scope.selected;

    $scope.add = function() {
        for (i in $scope.friends) {
            if ($scope.friends[i].id === $scope.selected)
                $scope.guests.push($scope.friends[i]);
        }
    };

    $scope.remove = function(unselected) {
        for (i in $scope.guests) {
            if ($scope.guests[i].id === unselected)
                $scope.guests.splice(i, 1);
        }
    };

	$scope.saveEvent = function() {
		Planner.editEvent($routeParams.eventID, $scope.title, $scope.description, $scope.guests);
        $window.alert("Saved event");
        $window.location.href = '/#/event/' + $routeParams.eventID;
    };

    $scope.removeEvent = function() {
    	Planner.deleteEvent($routeParams.eventID);
        $window.alert("Removed event");
    	$window.location.href = '/#/browse-events';
    };

    (function(){
    	var mEvent = Planner.getEvent($routeParams.eventID);
    	$scope.title = mEvent.name;
		$scope.description = mEvent.description;
		$scope.guests = mEvent.guests;
    })();
});
