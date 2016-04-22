magenta.controller('CreateCtrl', function($scope, $window, Planner) {

	$scope.createEvent = function() {
		Planner.addEvent().then(function(resp) {
			Planner.setCurrentEvent(resp.data._id);
			$window.location.href = '/#/edit-event';
        });
	};
});
