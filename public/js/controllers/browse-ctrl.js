magenta.controller('BrowseCtrl', function($scope, Planner) {

		$scope.events = console.log(Planner.getEvents());
		$scope.me = console.log(Planner.me.id);

});
