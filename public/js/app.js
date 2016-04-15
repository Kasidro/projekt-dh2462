var app = angular.module('app', ['ngRoute', 'ngResource'])

	// Route
	.config(function($routeProvider) {
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/home.html'
			}).
			when('/planner', {
				templateUrl: 'partials/planner.html',
				controller: 'PlannerCtrl'
			}).
			when('/start-menu', {
				templateUrl: 'partials/start-menu.html'
			}).
			when('/test', {
				templateUrl: 'partials/test.html',
				controller: 'DemoCtrl'
			}).
			otherwise({
				redirectTo: '/home'
			});
	})

	// Load FB SDK
	.run(['$window', function($window) {
		$window.fbAsyncInit = function() {
			FB.init({
				appId: '1536790389949976',
				xfbml: true,
				version: 'v2.5'
			});
		};

		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}]);
