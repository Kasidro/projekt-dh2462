magenta.controller('DetailsCtrl', function($scope, Planner) {

    var maxDaysPerPage = 3;
    var cLastIdx = maxDaysPerPage - 1;

    $scope.mEvent = Planner.getEvent(Planner.getCurrentEvent());
    $scope.cPage = [];
    $scope.nDay;

    var chgDate = function(date, add) {
        msec = Date.parse(date);
        if (add === 'add') {
            //Add one day
            msec += 86400000;
        } else {
            //Remove one day
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
        //Find place to put day if date is taken
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
        if (cLastIdx + 1 < $scope.nDays) {
            cLastIdx++
        }
    };

    $scope.prevPage = function() {
        if (cLastIdx > maxDaysPerPage - 1) {
            cLastIdx--
        }
    };

    $scope.hasPagesToRight = function() {
        return (cLastIdx + 1 < $scope.nDays);
    };

    $scope.hasPagesToLeft = function() {
        return (cLastIdx > maxDaysPerPage - 1);
    };

    $scope.$watch(function() {
        if (!Planner.isDbFetched()) return;
        $scope.cPage = [];
        $scope.nDays = $scope.mEvent.days.length;
        for (var i = cLastIdx - 2; i <= cLastIdx && i < $scope.nDays; i++) {
            $scope.cPage.push($scope.mEvent.days[i]);
        }
    })
});
