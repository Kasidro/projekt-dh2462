app.factory('Storage', function($http) {

	// create
	this.postEvent = function(eventData) {
		return $http.post('/api/events', eventData);
	}

	// read
	this.getEvent = function(eventId) {
		return $http.get('/api/events/' + eventId);
	}

	// update
	this.putEvent = function(id, eventData) {
		return $http.put('/api/events/' + id, eventData);
	}

	// delete
	this.deleteEvent = function(id) {
		return $http.delete('/api/events/' + id);
	}

	// read all
	this.getEvents = function(facebookId) {
		return $http.get('/api/events/facebook/' + facebookId);
	}

	// delete all
	this.deleteEvents = function(facebookId) {
		return $http.delete('/api/events/facebook/' + facebookId);
	}

	return this;
});
