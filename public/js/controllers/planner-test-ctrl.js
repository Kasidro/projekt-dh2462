magenta.controller('PlannerTestCtrl', function($scope, Planner) {
    $scope.login = function() {
        Planner.login()
            .then(function(response) {
                console.log(response);
            }).catch(function(error) {
                console.log(error);
            });
    }

    $scope.logout = function() {
        Planner.logout()
            .then(function(resp) {
                console.log(resp);
            }).catch(function(error) {
                console.log(error);
            });
    }

    $scope.addEvent = function() {
        Planner.addEvent('super event', 'such fun', ['o', 'm']).then(function(resp) {
            console.log(resp);
        });
    }

    $scope.getEvents = function() {
        console.log(Planner.getEvents());
    }

    $scope.getEvent = function() {
        console.log(Planner.getEvent(Planner.getEvents()[0]._id));
    }

    $scope.addDay = function() {
        date1 = new Date(2004,11,24);
        Planner.addDay(Planner.getEvents()[0]._id,date1,10);
    }

    $scope.getFriends = function() {
        console.log(Planner.getFriends());
    }
});
