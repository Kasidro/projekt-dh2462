magenta.controller('TestCtrl', function($scope, Test) {

    $scope.statusString = Test.statusString;
    $scope.userLoginStatus = Test.userLoginStatus;
    $scope.me = Test.me;
    $scope.friends = Test.friends;
    $scope.events = Test.events;
    $scope.login = Test.login;
    $scope.logout = Test.logout;
    $scope.add = Test.add;
    $scope.remove = Test.remove;
});
