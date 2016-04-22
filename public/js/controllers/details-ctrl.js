magenta.controller('DetailsCtrl', function($scope, Planner) {

    var pc = 3;
    var cLastindex = pc - 1;

    $scope.mEvent = Planner.getEvent(Planner.getCurrentEvent());
    $scope.cPage = [];
    $scope.nDay;

    var chgDate = function(date, add) {
        msec = Date.parse(date);
        if (add === 'add') {
            msec += 86400000;
        } else {
            msec -= 86400000;
        }
        var d = new Date(msec);
        return d.toISOString().substring(0, 10);
    }

    $scope.deleteDay = function(date) {
        Planner.deleteDay($scope.mEvent._id, date);
    };

    $scope.addDay = function() {
        if ($scope.nDays !== 0) {
            var date = $scope.mEvent.days[$scope.nDays - 1].date;
            var start = $scope.mEvent.days[$scope.nDays - 1].start;
            Planner.addDay($scope.mEvent._id, chgDate(date, 'add'), start);
        } else {
            var d = new Date()
            Planner.addDay($scope.mEvent._id, d.toISOString().substring(0, 10), '08:00');
        }
    };

    $scope.changeDay = function(date, start, add) {
        var newdate = chgDate(date, add);
        var olddate = date;
        while (Planner.editDay($scope.mEvent._id, date, newdate, start) === -1) {
            olddate = newdate;
            newdate = chgDate(olddate, add);
        }
    };

    $scope.changeStart = function(date, start, add) {
        if (add === 'add') {
            var ti = 15;
        } else {
            var ti = -15;
        }
        var h = parseInt(start.substring(0, 2));
        var m = parseInt(start.substring(3, 5));
        if (!isNaN(h) && !isNaN(m)) {
            var d = new Date(1999, 11, 31, h + 1, m + ti);
            console.log("Party like it's " + d.toString().substring(0, 15) + "!");
            Planner.editDay($scope.mEvent._id, date, date, d.toISOString().substring(11, 16));
        }
    };

    $scope.getDayName = function(date) {
        var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var d = new Date(Date.parse(date));
        return weekday[d.getDay()];
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

    $scope.pagesToRight = function() {
        return (cLastindex + 1 < $scope.nDays);
    };

    $scope.pagesToLeft = function() {
        return (cLastindex > pc - 1);
    };

    $scope.$watch(function() {
        if (!Planner.isDbFetched()) return;
        $scope.cPage = [];
        $scope.nDays = $scope.mEvent.days.length;
        for (var i = cLastindex - 2; i <= cLastindex && i < $scope.nDays; i++) {
            $scope.cPage.push($scope.mEvent.days[i]);
        }
    })
});
