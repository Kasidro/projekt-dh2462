magenta.controller('CreateCtrl', function($scope, $window, Planner, Status) {

    $scope.createEvent = function() {
        Planner.addEvent().then(function(resp) {
            Status.setStatusMsg("Created new event");
            Planner.setCurrentEvent(resp.data._id);
            $window.location.href = '/#/edit-event';
        }).catch(function(error) {
            console.log(error);
            Status.setStatusMsg("Error creating event");
        });
    };
});
