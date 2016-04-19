magenta.controller('PlannerTestCtrl', function($scope, Planner) {
    $scope.login = function() {
        Planner.login()
            .then(function(response) {
                console.log(response);
            }).catch(function(error) {
                console.log(error);
            });
    }

    $scope.addEvent = function() {
        Planner.addEvent(['o', 'm'], 'super event', 'such fun').then(function(resp) {
            console.log(resp);
        });
    }
});
