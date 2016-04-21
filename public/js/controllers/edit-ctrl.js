magenta.controller('EditCtrl', function($scope, Planner) {

	$scope.title;
	$scope.guests = {};
	$scope.description;

	$scope.addEvent = function() {
		Planner.addEvent($scope.title, $scope.description, $scope.guests).then(function(resp) {
            console.log(resp);
        console.log($scope.title);
        console.log($scope.description);
        console.log($scope.guests);
        });
    }

});
