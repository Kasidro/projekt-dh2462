magenta.controller('HeaderCtrl', function($scope, Planner) {
    
    $scope.me = Planner.getMe();
});