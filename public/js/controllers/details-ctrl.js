magenta.controller('DetailsCtrl', function($scope, Planner) {

    var pc = 3;
    var cLastindex = pc - 1;

    $scope.mEvent = Planner.getEvent(Planner.getCurrentEvent());
    $scope.cPage = [];
    $scope.nDay;

    $scope.deleteDay = function(date) {
        Planner.deleteDay($scope.mEvent._id, date);
    };

    $scope.addDay = function(date, start) {
        Planner.addDay($scope.mEvent._id, date, start);
    };

    $scope.nextPage = function() {
        if (cLastindex + 1 < $scope.nDays) {
            cLastindex++
        }
    };
    $scope.prevPage = function() {
        if (cLastindex > pc - 1) {
            cLastindex--
        }
    };

    $scope.$watch(function() {
        console.log('change');
        if (!Planner.isDbFetched()) return;
        $scope.cPage = [];
        $scope.nDays = $scope.mEvent.days.length;
        for (var i = cLastindex - 2; i <= cLastindex && i < $scope.nDays; i++) {
            $scope.cPage.push($scope.mEvent.days[i]);
        }
    })
});
