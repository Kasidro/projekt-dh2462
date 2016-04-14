meetingPlannerApp.factory('Planner', function($http) {
	return {
		postActivity: function(activityData) {
			return $http.post('/api/activities', activityData);
		},
		getActivity: function(id) {
			return $http.get('/api/activities/' + id);
		}
	}
});

console.log('services/planner.js loaded')
