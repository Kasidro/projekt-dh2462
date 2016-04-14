meetingPlannerApp.factory('Tester', function($http) {

	// create
	this.postEvent = function(eventData) {
		return $http.post('/api/events', eventData);
	}

	// read
	this.getEvent = function(id) {
		return $http.get('/api/events/' + id);
	}

	// update
	this.putEvent = function(id, eventData) {
		return $http.put('/api/events/' + id, eventData);
	}

	// delete
	this.deleteEvent = function(id) {
		return $http.delete('/api/events/' + id);
	}

	return this;
});

console.log('services/tester.js loaded')
