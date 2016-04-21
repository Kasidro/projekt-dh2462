magenta.controller('HeaderCtrl', function($scope, $window, Planner) {

	$scope.createEvent = function() {
		Planner.addEvent().then(function(resp) {
			Planner.currentEvent = resp.data._id;
			$window.location.href = '/#/edit-event';
        });
	};
});
