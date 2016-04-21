magenta.controller('EventCtrl', function($scope, $routeParams, Planner) {

    var pc = 3;
    var cLastindex = pc - 1;

    $scope.id = $routeParams.eventID;
    $scope.mEvent = Planner.getEvent($scope.id);
    $scope.cPage = [];
    $scope.nDay;

    $scope.nextPage = function() {
        if (cLastindex + 1 < $scope.nDays) {
            cLastindex++
            $scope.cPage.splice(0, 1);
            $scope.cPage.push($scope.mEvent.days[cLastindex]);
        }
    };
    $scope.prevPage = function() {
        if (cLastindex > pc - 1) {
            cLastindex--
            $scope.cPage.splice(pc - 1, 1);
            $scope.cPage.unshift($scope.mEvent.days[cLastindex - (pc - 1)]);
        }
    };

    (function() {
        $scope.nDays = $scope.mEvent.days.length;
        console.log($scope.mEvent.days[0]);
        for (var i = 0; i < pc && i < $scope.nDays; i++) {
            $scope.cPage.push($scope.mEvent.days[i]);
        }
    })();

});
