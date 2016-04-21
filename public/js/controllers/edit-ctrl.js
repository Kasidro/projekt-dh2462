magenta.controller('EditCtrl', function($scope, $window, Planner, $routeParams) {

	$scope.title;
    $scope.friends = Planner.getFriends();
	$scope.guests = [];
    $scope.selected;

    var getFriend = function(id) {
        for (i in $scope.friends) {
            if ($scope.friends[i].id === id)
                return $scope.friends[i];
        }
    };

    $scope.add = function() {
        $scope.guests.push(getFriend($scope.selected));
    };

    $scope.remove = function(unselected) {
        for (i in $scope.guests) {
            if ($scope.guests[i].id === unselected)
                $scope.guests.splice(i, 1);
        }
    };

	$scope.saveEvent = function() {
        var guestIds = [];
        for (i in $scope.guests) guestIds.push($scope.guests[i].id);
		Planner.editEvent($routeParams.eventID, $scope.title, guestIds);
        $window.alert("Saved event");
        $window.location.href = '/#/event-details/' + $routeParams.eventID;
    };

    $scope.removeEvent = function() {
    	Planner.deleteEvent($routeParams.eventID);
        $window.alert("Removed event");
    	$window.location.href = '/#/browse-events';
    };

    (function(){
    	var mEvent = Planner.getEvent($routeParams.eventID);
    	$scope.title = mEvent.name;
        for (i in mEvent.guests) {
            $scope.guests.push(getFriend(mEvent.guests[i]));   
        }
    })();
});
