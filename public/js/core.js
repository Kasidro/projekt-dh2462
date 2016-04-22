var magenta = angular.module('magenta', ['ngCookies', 'ngRoute', 'dndLists'])

    // Route
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
            })
            .when('/start-menu', {
                templateUrl: 'partials/start-menu.html',
                controller: 'CreateCtrl'
            })
            .when('/edit-event', {
                templateUrl: 'partials/edit-event.html',
                controller: 'EditCtrl'
            })
            .when('/browse-events', {
                templateUrl: 'partials/browse-events.html',
                controller: 'BrowseCtrl'
            })
            .when('/event-details', {
                templateUrl: 'partials/event-details.html',
                controller: 'DetailsCtrl'
            })
            .when('/edit-activity', {
                templateUrl: 'partials/edit-activity.html',
                controller: 'ActivityCtrl'
            })
            // Test related
            .when('/test', {
                templateUrl: 'partials/test.html',
                controller: 'TestCtrl'
            })
            .when('/test2', {
                templateUrl: 'partials/test2.html',
                controller: 'Test2Ctrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    // Auth
    .run(function($rootScope, $location, $cookieStore, $route, Planner) {
        $rootScope.$on('$routeChangeStart', function (event) {
            if ($location.path() !== '/') {
                if (Planner.getLoginStatus() !== 'connected') {
                    if ($cookieStore.get('loginStatus') === 'connected')
                        Planner.retrieveTempData().then($route.reload);
                    else
                        $location.path('/');
                }
            }
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
