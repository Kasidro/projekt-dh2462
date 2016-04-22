magenta.controller('HeaderCtrl', function($scope, $window, Planner) {
    
    $scope.me = Planner.getMe();

    $scope.status = Planner.getHeaderStatus();

    $scope.$on('CLEAR_HEADER_STATUS', function(event, args) {
    	$scope.status = undefined;    	
    });

    $scope.logout = function() {
    	Planner.logout();
    	$window.location.href = '/#/';
    };
});
