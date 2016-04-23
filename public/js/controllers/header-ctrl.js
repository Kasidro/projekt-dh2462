magenta.controller('HeaderCtrl', function($scope, $window, Planner, Status) {
    
    $scope.me = Planner.getMe();

    $scope.status = Status.getStatusMsg();

    $scope.$on('STATUS_MSG', function(event, args) {
    	$scope.status = args;    	
    });

    $scope.logout = function() {
    	Planner.logout();
    	$window.location.href = '/#/';
    };
});
