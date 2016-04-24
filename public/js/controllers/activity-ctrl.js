magenta.controller('ActivityCtrl', function($scope, Planner, Status, $window) {

		$scope.mEvent;
    $scope.title = "";
    $scope.duration;
    $scope.type = "";
    $scope.description = "";
    $scope.isMyActivity;
 		$scope.date = Planner.getCurrentDate();
   	$scope.eventId = Planner.getCurrentEvent();
    $scope.activityPosition = Planner.getCurrentActivityPosition();

    $scope.timeLeft = function() {
    	var day = Planner.getDay($scope.eventId, $scope.date);
    	var activities = day.activities;
 			var totalTime = 0;
 			var startTime = day.start;

    	for (i = 0; i < activities.length; i++) {
    			totalTime += activities[i].length;
    	}
    	return intToTime(24*60 - dateToDuration(startTime) - totalTime);
    };

    $scope.saveActivity = function() {

    	var day = Planner.getDay($scope.eventId, $scope.date);
    	var timeLeft = calculateTimeLeft(day);

    	if (timeLeft === 0) {
    		if (Planner.editActivity($scope.eventId, $scope.date, $scope.title, dateToDuration($scope.duration),
	    	$scope.type, $scope.description, $scope.activityPosition) === 0) {
	    		Status.setStatusMsg("Saved activity");
	    		$window.location.href = '/#/event-details';
	    	}
	    	else {
	    		Status.setStatusMsg("Error saving activity");
	    	}
	    }
	    else {
	    	Status.setStatusMsg("Not enough remaining time");
	    }


    };

    $scope.removeActivity = function() {
    	if(Planner.deleteActivity($scope.eventId, $scope.date, $scope.activityPosition) === 0) {
    		Status.setStatusMsg("Removed activity");
    	}
    	else {
    		Status.setStatusMsg("Error removing activity");
    	}
    };

    var calculateTimeLeft = function(day) {
    	var activities = day.activities;
 			var totalTime = 0;
 			var startTime = day.start;

    	for (i = 0; i < activities.length; i++) {
    		if (i != $scope.activityPosition)
    			totalTime += activities[i].length;
    	}

    	if ((totalTime + dateToDuration($scope.duration)) > (24*60 - dateToDuration(startTime))) {
    		return -1;
    	}

    	return 0;
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


    (function() {
    		if (!Planner.isDbFetched()) return;
    	
        $scope.isMyActivity = (Planner.getMe().id === Planner.getEvent($scope.eventId).owner);
      
        var activity = Planner.getActivity(Planner.getCurrentEvent(), Planner.getCurrentDate(), Planner.getCurrentActivityPosition());
        $scope.title = activity.name;
        $scope.duration = intToTime(activity.length);
        $scope.type = activity.type;
        $scope.description = activity.description; 
    })();
});
