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
        console.log(Planner.getEvent(Planner.getEvents()[1]._id));
    }

    $scope.addDay = function() {
        Planner.addDay(Planner.getEvents()[1]._id, "2016-05-12", 10);
    }

    $scope.getFriends = function() {
        console.log(Planner.getFriends());
    }

    $scope.addActivity = function() {
        Planner.addActivity(Planner.getEvents()[1]._id, "2016-05-12", 'activ 2', 10, 1, 'oh no!', 0);
    };

    $scope.deleteEvent = function() {
        Planner.deleteEvent(Planner.getEvents()[1]._id);
    };

    $scope.deleteDay = function() {
        Planner.deleteDay(Planner.getEvents()[1]._id, "2016-05-12");
    };
});
