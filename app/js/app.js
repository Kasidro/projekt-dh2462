var meetingPlanner = angular.module('meetingPlanner', ['ngRoute','ngResource']);

dinnerPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/home.html'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);