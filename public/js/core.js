var meetingPlannerApp = angular.module('meetingPlanner', ['ngRoute','ngResource']);

meetingPlannerApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/home.html'
			}).
			when('/planner', {
				templateUrl: 'partials/planner.html'
			}).
			when('/start_menu', {
				templateUrl: 'partials/start_menu.html'
			}).
			otherwise({
				redirectTo: '/home'
			});
	}
]);
