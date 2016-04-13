var meetingPlannerApp = angular.module('meetingPlanner', ['ngRoute','ngResource']);

meetingPlannerApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/home.html'
			}).
			otherwise({
				redirectTo: '/home'
			});
	}
]);
