meetingPlannerApp.factory('Tester', function($http) {
	
	this.postActivity = function(activityData) {
		return $http.post('/api/activities', activityData);
	}

	this.getActivity = function(id) {
		return $http.get('/api/activities/' + id);
	}

	return this;
});

console.log('services/tester.js loaded')
