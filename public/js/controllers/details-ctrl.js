magenta.controller('DetailsCtrl', function($scope, Planner, Status, $window) {

    var maxDaysPerPage = 3;
    var startTimeIncr = 15;
    var cLastIdx = maxDaysPerPage - 1;

    $scope.mEvent = Planner.getEvent(Planner.getCurrentEvent());
    $scope.cPage = [];
    $scope.nDays;
    $scope.isMyEvent;

    $scope.testDays = ['activity1', 'activity2', 'activity3', 'activity4', 'activity5'];

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
    };

    // date: String on format "YYYY-MM-DD"
    $scope.deleteDay = function(date) {
        if (Planner.deleteDay($scope.mEvent._id, date) === 0) {
            Status.setStatusMsg("Removed day");
        } else {
            Status.setStatusMsg("Error removing day");
        }
    };

    $scope.logEvent = function(message, event) {
        console.log(message);
        console.log(event);
    };

    $scope.moveActivityCallback = function(event, index, activity, external, type, itemType, day) {
        
        var totalTime = dateToDuration(day.start);
        var activities = day.activities;

        //if we try to move from and to the same list with only one item
        //just return
        //if (activities.length === 1) {
        //    if (activities[0]._id === activity._id) {
        //        return false;
        //    }
        //}

        //if we try move from and to the same with more objects we dont need to check for space.
        for (i = 0; i < activities.length; i++) {
            if (activities[i]._id === activity._id) {
                return activity;
            }
        }

        //Else we need to make sure there is space in the destination day.
        for (i = 0; i < activities.length; i++) {
            totalTime += activities[i].length;
        }

        totalTime += activity.length;

        if (totalTime > 24*60) {
            Status.setStatusMsg("Not enough remaining time");
            return false;
        }
        return activity;
    };


    $scope.reArrangeActivities = function() {
        if(Planner.editActivities(Planner.getCurrentEvent()) === 0) {
            Status.setStatusMsg("Moved activity");
        }
        else
            Status.setStatusMsg("Error moving event");
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
            if (Planner.editDay($scope.mEvent._id, date, date, d.toISOString().substring(11, 16)) === 1) {
                Status.setStatusMsg("End of day");
            }
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
            cLastIdx++;
            Planner.eventCLastIdxMap[$scope.mEvent._id] = cLastIdx;
        }
    };

    $scope.prevPage = function() {
        if (cLastIdx > maxDaysPerPage - 1) {
            cLastIdx--;
            Planner.eventCLastIdxMap[$scope.mEvent._id] = cLastIdx;
        }
    };

    $scope.hasPagesToRight = function() {
        return (cLastIdx + 1 < $scope.nDays);
    };

    $scope.hasPagesToLeft = function() {
        return (cLastIdx > maxDaysPerPage - 1);
    };

    $scope.createActivity = function(day) {
        console.log(day);
        Planner.setCurrentDate(day.date);
        Planner.addActivity(Planner.getCurrentEvent(), day.date, "",0,"","");
        Planner.setCurrentActivityPosition(day.activities.length - 1);
    };

    $scope.editActivity = function(day, pos) {
        Planner.setCurrentDate(day.date);
        Planner.setCurrentActivityPosition(pos);
        $window.location.href = '#/edit-activity';
    };

    var getLength = function(day) {
        var length = 0;
        for (i in day.activities) {
            var a = day.activities[i];
            length += a.length;
        }
        return length;
    };

    var minutesToHHMM = function(minutes) {
        hhString = Math.floor(minutes / 60);
        if (hhString < 10)
            hhString = '0' + hhString;
        mmString = minutes % 60;
        if (mmString < 10)
            mmString = '0' + mmString;
        return hhString + ':' +  mmString;
    };

    var dateToDuration = function(time) {

        if (time.length == 5) {
            var h = parseInt(time.substring(0, 2));
            var m = parseInt(time.substring(3, 5));
            time = new Date(1999, 11, 31, h, m);
        }

        var parsedTime = time;

        var d = new Date(time);
        var hours = d.getHours();
        var minutes = d.getMinutes();

        parsedTime = hours * 60 + minutes;

        return parsedTime;
    };

    var intToTime = function(time) {
        var hours = Math.floor(time / 60);
        var minutes = time - hours * 60;

            var d = new Date();
            d.setMinutes(minutes);
            d.setHours(hours);
            d.setSeconds(0);
            d.setMilliseconds(0);

            return d;
    };

    $scope.$watch(function() {
        if (!Planner.isDbFetched()) return;
        if (Planner.eventCLastIdxMap[$scope.mEvent._id] !== undefined)
            cLastIdx = Planner.eventCLastIdxMap[$scope.mEvent._id];
        $scope.cPage = [];
        $scope.nDays = $scope.mEvent.days.length;
        for (var i = cLastIdx - 2; i <= cLastIdx && i < $scope.nDays; i++) {
            var day = $scope.mEvent.days[i];
            var start = day.start.split(':');
            var lengthMinutes = getLength(day);
            var endMinutes = parseInt(start[0]) * 60 + parseInt(start[1]) + lengthMinutes;
            day.length = minutesToHHMM(lengthMinutes);
            day.end = minutesToHHMM(endMinutes);
            $scope.cPage.push(day);
        }
    });

    (function() {
        if (!Planner.isDbFetched()) return;
        $scope.isMyEvent = (Planner.getMe().id === $scope.mEvent.owner);
    })();
});
