magenta.controller('HomeCtrl', function($scope, $window, Planner) {

	$scope.status = 'Welcome, please login';

    $scope.login = function() {
    	$scope.status = 'Loging in...';
    	Planner.login()
    		.then(function(res) {
    			console.log(res);
    			$window.location.href = '/#/start-menu';
    		}).catch(function(err) {
    			console.error(err);
    			$scope.status = 'Loging failed, please try again';
    		});
    }
});
