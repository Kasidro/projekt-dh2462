magenta.controller('HeaderCtrl', function($scope, $window, Planner) {
    
    $scope.me = Planner.getMe();

    $scope.status = Planner.getHeaderStatus();

    $scope.$on('HEADER_STATUS', function(event, args) {
    	$scope.status = args;    	
    });

    $scope.logout = function() {
    	Planner.logout();
    	$window.location.href = '/#/';
    };
});
