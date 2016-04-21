magenta.controller('EventCtrl', function($scope, $routeParams, Planner) {
    
    $scope.id = $routeParams.eventID;
    $scope.mEvent = Planner.getEvent($scope.id);
    $scope.cPage = [];
    $scope.page = 1;
    $scope.nDays;
    $scope.nexpage = function() {
        
    };
    $scope.prevPage = function() {};

    (function() {
        $scope.nDays = $scope.mEvent.days.length;
        for (var i = 0; i < 3 && i < $scope.nDays; i++) {
            $scope.cPage.push($scope.mEvent.days[i]);
        }
        
    })();

});
