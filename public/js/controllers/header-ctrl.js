magenta.controller('HeaderCtrl', function($scope, Planner) {
    
    $scope.me = Planner.getMe();

    $scope.status = Planner.getHeaderStatus();

    $scope.$on('CLEAR_HEADER_STATUS', function(event, args) {
    	$scope.status = undefined;    	
    });
});
