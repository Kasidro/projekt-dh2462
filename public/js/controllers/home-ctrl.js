magenta.controller('HomeCtrl', function($scope, $window, Planner) {

    $scope.login = function() {
    	Planner.login()
    		.then(function(res) {
    			console.log(res);
    			$window.location.href = '/#/start-menu';
    		}).catch(function(err) {
    			console.error(err);
    		});
    }
});
