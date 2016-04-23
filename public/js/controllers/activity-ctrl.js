magenta.controller('ActivityCtrl', function($scope, Planner, Status) {

		$scope.mEvent;
    $scope.title = "";
    $scope.duration;
    $scope.type = "";
    $scope.description = "";
    $scope.isMyActivity;
 		$scope.date = Planner.getCurrentDate();
   	$scope.eventId = Planner.getCurrentEvent();
    $scope.activityPosition = Planner.getCurrentActivityPosition();

    $scope.saveActivity = function() {
    	if (Planner.editActivity($scope.eventId, $scope.date, $scope.title, dateToDuration($scope.duration),
    	$scope.type, $scope.description, $scope.activityPosition) === 0) {
    		Status.setStatusMsg("Saved activity");
    	}
    	else {
    		Status.setStatusMsg("Error saving activity");
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

    var dateToDuration = function(time) {

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
