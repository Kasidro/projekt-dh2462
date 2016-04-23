magenta.controller('DetailsCtrl', function($scope, Planner, Status) {

    var maxDaysPerPage = 3;
    var startTimeIncr = 15;
    var cLastIdx = maxDaysPerPage - 1;

    $scope.mEvent = Planner.getEvent(Planner.getCurrentEvent());
    $scope.cPage = [];
    $scope.nDays;
    $scope.isMyEvent;

    // date: String on format "YYYY-MM-DD"
    // add: String 'add' adds, otherwise subtract
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

    // date: String on format "YYYY-MM-DD"
    $scope.deleteDay = function(date) {
        if (Planner.deleteDay($scope.mEvent._id, date) === 0) {
            Status.setStatusMsg("Removed day");
        } else {
            Status.setStatusMsg("Error removing day");
        }
    };

    $scope.addDay = function() {
        var date;
        var start;
        if ($scope.nDays !== 0) {
            date = chgDate($scope.mEvent.days[$scope.nDays - 1].date, "add");
            start = $scope.mEvent.days[$scope.nDays - 1].start;
        } else {
            var d = new Date()
            date = d.toISOString().substring(0, 10);
            start = "08:00";
        }

        if (Planner.addDay($scope.mEvent._id, date, start) === 0) {
            Status.setStatusMsg("Added new day");
        } else {
            Status.setStatusMsg("Error adding new day");
        }
    };

    // date: String on format "YYYY-MM-DD"
    // start: String on format "HH:MM"
    // add: String 'add' adds, otherwise subtract
    $scope.changeDay = function(date, start, add) {
        var newdate = chgDate(date, add);
        var olddate = date;
        //Find availible date if date is taken
        while (Planner.editDay($scope.mEvent._id, date, newdate, start) === -1 &&
            $scope.isMyEvent
        ) {
            olddate = newdate;
            newdate = chgDate(olddate, add);
        }
    };

    // date: String on format "YYYY-MM-DD"
    // start: String on format "HH:MM"
    // add: String 'add' adds, otherwise subtract
    $scope.changeStart = function(date, start, add) {
        if (add === 'add') {
            var ti = startTimeIncr;
        } else {
            var ti = -1 * startTimeIncr;
        }
        var h = parseInt(start.substring(0, 2));
        var m = parseInt(start.substring(3, 5));
        if (!isNaN(h) && !isNaN(m)) {
            var d = new Date(1999, 11, 31, h + 1, m + ti);
            console.log("Party like it's " + d.toString().substring(0, 15) + "!");
            Planner.editDay($scope.mEvent._id, date, date, d.toISOString().substring(11, 16));
        }
    };

    // date: String on format "YYYY-MM-DD"
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
    });

    (function() {
        if (!Planner.isDbFetched()) return;
        $scope.isMyEvent = (Planner.getMe().id === $scope.mEvent.owner);
    })();
});
