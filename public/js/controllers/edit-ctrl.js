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
    }

});
