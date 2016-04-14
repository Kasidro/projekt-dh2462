var meetingPlannerApp = angular.module('meetingPlanner', ['ngRoute', 'ngResource']);

meetingPlannerApp.config(function($routeProvider) {
	$routeProvider.
		when('/home', {
			templateUrl: 'partials/home.html'
		}).
		when('/planner', {
			templateUrl: 'partials/planner.html',
			controller: 'PlannerController'
		}).
		when('/start_menu', {
			templateUrl: 'partials/start_menu.html'
		}).
		when('/test', {
			templateUrl: 'partials/test.html',
			controller: 'TestController'
		}).
		otherwise({
			redirectTo: '/home'
		});
});

console.log('core.js loaded')
