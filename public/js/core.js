var magenta = angular.module('magenta', ['ngRoute', 'ngResource', 'dndLists'])

// Route
.config(function($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    }).
    when('/start-menu', {
        templateUrl: 'partials/start-menu.html',
        controller: 'StartCtrl'
    }).
    when('/edit-event', {
        templateUrl: 'partials/edit-event.html',
        controller: 'EditCtrl'
    }).
    when('/browse-events', {
        templateUrl: 'partials/browse-events.html',
        controller: 'BrowseCtrl'
    }).
    when('/event', {
        templateUrl: 'partials/event.html',
        controller: 'EventCtrl'
    }).
    when('/new-activity', {
        templateUrl: 'partials/new-activity.html',
        controller: 'EventCtrl'
    }).
    // Test related
    when('/test', {
        templateUrl: 'partials/test.html',
        controller: 'TestCtrl'
    }).
    when('/test2', {
        templateUrl: 'partials/test2.html',
        controller: 'Test2Ctrl'
    }).
    otherwise({
        redirectTo: '/home'
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
    }

    ;
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
