magenta.controller('PlannerTestCtrl', function($scope, Planner) {
    $scope.login = function() {
        Planner.login()
            .then(function(response) {
                console.log(response);
            }).catch(function(error) {
                console.log(error);
            });
    };

    $scope.logout = function() {
        Planner.logout()
            .then(function(resp) {
                console.log(resp);
            }).catch(function(error) {
                console.log(error);
            });
    };

    $scope.addEvent = function() {
        Planner.addEvent(['o', 'm'], 'super event', 'such fun').then(function(resp) {
            console.log(resp);
        });
    };

    $scope.getEvents = function() {
        console.log(Planner.getEvents());
    };

    $scope.getEvent = function() {
        console.log(Planner.getEvent("5716b0c5f5713c976aa3e0f7"));
    };

    $scope.getFriends = function() {
        console.log(Planner.getFriends());
    };
});
