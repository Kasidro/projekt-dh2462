magenta.controller('EditCtrl', function($scope, $window, Planner, Status) {

    $scope.title;
    $scope.friends = Planner.getFriends();
    $scope.guests = [];
    $scope.isMyEvent;

    var getFriend = function(id) {
        for (i in $scope.friends) {
            if ($scope.friends[i].id === id)
                return $scope.friends[i];
        }
        return Planner.getMe();
    };

    var getGuest = function(id) {
        for (i in $scope.guests) {
            if ($scope.guests[i].id === id)
                return $scope.guests[i];
        }
        return null;
    };

    $scope.add = function(selected) {
        if (getGuest(selected) === null)
            $scope.guests.push(getFriend(selected));
    };

    $scope.remove = function(unselected) {
        for (i in $scope.guests) {
            if ($scope.guests[i].id === unselected)
                $scope.guests.splice(i, 1);
        }
    };

    $scope.viewDetails = function() {
        $window.location.href = '/#/event-details';
    };

    $scope.saveEvent = function() {
        var guestIds = [];
        for (i in $scope.guests) guestIds.push($scope.guests[i].id);
        if (Planner.editEvent(Planner.getCurrentEvent(), $scope.title, guestIds) == 0) {
            Status.setStatusMsg('Saved event');
            $window.location.href = '/#/event-details';
        } else {
            Status.setStatusMsg('Error saving event');
        }
    };

    $scope.removeEvent = function() {
        if (Planner.deleteEvent(Planner.getCurrentEvent()) == 0) {
            Status.setStatusMsg('Removed event');
            $window.location.href = '/#/browse-events';
        } else {
            Status.setStatusMsg('Error removing event');
        }
    };

    (function() {
        if (!Planner.isDbFetched()) return;
        var mEvent = Planner.getEvent(Planner.getCurrentEvent());
        $scope.title = mEvent.name;
        $scope.isMyEvent = (Planner.getMe().id === mEvent.owner);
        for (i in mEvent.guests) {
            $scope.guests.push(getFriend(mEvent.guests[i]));
        }
    })();
});
