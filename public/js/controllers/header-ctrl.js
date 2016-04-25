magenta.controller('HeaderCtrl', function($scope, $window, Planner, Status) {

    $scope.me = Planner.getMe();

    $scope.status = Status.getStatusMsg();

    $scope.logout = function() {
        Planner.logout();
        $window.location.href = '/#/';
    };

    $scope.$on('STATUS_MSG', function(event, args) {
        $scope.status = args;
    });
});
