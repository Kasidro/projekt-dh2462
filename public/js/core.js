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
        when('/testLogin', {
            templateUrl: 'partials/testLogin.html',
            controller: 'FacebookCtrl'
        }).
		otherwise({
			redirectTo: '/home'
		});
});

//Load FB SDK
meetingPlannerApp.run(['$window', function($window) {
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

console.log('core.js loaded')
