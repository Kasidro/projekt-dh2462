var magenta = angular.module('magenta', ['ngRoute', 'ngResource'])

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
			when('/event', {
				templateUrl: 'partials/event.html'
			}).
			when('/new-event', {
				templateUrl: 'partials/new-event.html'
			}).
			when('/browse-event', {
				templateUrl: 'partials/browse-event.html'
			}).
			when('/test', {
				templateUrl: 'partials/test.html',
				controller: 'TestCtrl'
			}).
			otherwise({
				redirectTo: '/start-menu'
			});
	})

	// Load FB SDK
	.run(function($window) {
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
	});
