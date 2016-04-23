magenta.controller('ActivityCtrl', function($scope, Planner, Status) {

		$scope.mEvent = Planner.getEvent(Planner.getCurrentEvent());
    $scope.activity;
    $scope.title = "";
    $scope.duration = "";
    $scope.type = "";
    $scope.description = "";
    $scope.isMyActivity;


    $scope.saveActivity = function() {
    	Planner.editActivity(Planner.getCurrentEvent(), Planner.getCurrentDate(), $scope.title, $scope.duration,
    	$scope.type, $scope.description, Planner.getCurrentActivityPosition());
    };

    $scope.removeActivity = function() {
    	Planner.deleteActivity(Planner.getCurrentEvent(), Planner.getCurrentDate(), Planner.getCurrentActivityPosition());
    };



    (function() {
    		if (!Planner.isDbFetched()) return;
    			
        $scope.isMyActivity = (Planner.getMe().id === Planner.getEvent(Planner.getCurrentEvent()).owner);
        var activity = Planner.getActivity(Planner.getCurrentEvent(), Planner.getCurrentDate(), Planner.getCurrentActivityPosition());
        $scope.title = activity.name;
        $scope.duration = activity.length;
        $scope.type = activity.type;
        $scope.description = activity.description; 
    })();
});
