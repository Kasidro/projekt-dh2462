<<<<<<< HEAD
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
=======
magenta.controller('EditCtrl', function($scope, Planner, $window) {

	$scope.title;
	$scope.guests = [];
	$scope.description;
	$scope.id;

	$scope.addEvent = function() {
		Planner.addEvent($scope.title, $scope.description, $scope.guests).then(function(resp) {
            console.log(resp);
            $window.location.href = '/#/event/' + resp.data._id;
        });
>>>>>>> origin/master
    }

    ;(function(){
    	var currentEvent = Planner.getEvent(Planner.currentEvent);
    	console.log(currentEvent);
    	$scope.title = currentEvent.title;
		$scope.description = currentEvent.description;
		$scope.guests = currentEvent.guests;
    })();
});
