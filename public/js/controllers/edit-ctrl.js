magenta.controller('EditCtrl', function($scope, $window, Planner) {

    $scope.title;
    $scope.friends = Planner.getFriends();
    $scope.guests = [];
    $scope.selected;
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

    $scope.add = function() {
        if (getGuest($scope.selected) === null)
            $scope.guests.push(getFriend($scope.selected));
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
        Planner.editEvent(Planner.getCurrentEvent(), $scope.title, guestIds);
        Planner.setHeaderStatus('Saved event');
        $window.location.href = '/#/event-details';
    };

    $scope.removeEvent = function() {
        Planner.deleteEvent(Planner.getCurrentEvent());
        Planner.setHeaderStatus('Removed event');
        $window.location.href = '/#/browse-events';
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
