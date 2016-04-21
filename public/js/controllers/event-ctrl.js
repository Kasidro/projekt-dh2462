magenta.controller('EventCtrl', function($scope, $routeParams, Planner) {


    $scope.id = $routeParams.eventID;
    $scope.mEvent = Planner.getEvent($scope.id);
    $scope.dayPage = [];
    $scope.nexpage = function() {};
    $scope.prevPage = function() {};

    (function() {
        for (var i = 0; i < 3 && i < $scope.mEvent.days.length; i++) {
            $scope.dayPage.push($scope.mEvent.days[i]);
        }
        console.log($scope.id);
        console.log($scope.mEvent);
        console.log($scope.dayPage);
    })();

});
