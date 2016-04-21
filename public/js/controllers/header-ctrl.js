magenta.controller('HeaderCtrl', function($scope, $window, Planner) {

	$scope.createEvent = function() {
		Planner.addEvent().then(function(resp) {
			$window.location.href = '/#/edit-event/' + resp.data._id;
        });
	};
});
