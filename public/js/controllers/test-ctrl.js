magenta.controller('TestCtrl', function($scope, Test) {

    var updateScope = function() {
        $scope.statusString = Test.getStatusString();
        $scope.userLoginStatus = Test.getUserLoginStatus();
        $scope.me = Test.getMe();
        $scope.friends = Test.getFriends();
        $scope.events = Test.getEvents();
    };

    $scope.login = Test.login;
    $scope.logout = Test.logout;
    $scope.add = Test.add;
    $scope.remove = Test.remove;

    $scope.$watch(function() { 
        updateScope();
    });
});
