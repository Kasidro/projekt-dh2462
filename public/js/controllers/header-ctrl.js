magenta.controller('ActivityCtrl', function($scope, Planner) {
    
    $scope.me = Planner.getMe();
});