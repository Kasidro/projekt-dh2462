magenta.controller('BrowseCtrl', function($scope, Planner) {

		$scope.events = console.log(Planner.getEvents());

});
