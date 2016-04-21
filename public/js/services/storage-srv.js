magenta.factory('Storage', function($http) {

	// create
	this.postEvent = function(eventData) {
		return $http.post('/api/events', eventData);
	};

	// read
	this.getEvent = function(eventId) {
		return $http.get('/api/events/' + eventId);
	};

	// update
	this.putEvent = function(eventId, eventData) {
		return $http.put('/api/events/' + eventId, eventData);
	};

	// delete
	this.deleteEvent = function(eventId) {
		return $http.delete('/api/events/' + eventId);
	};

	// read all
	this.getEvents = function(facebookId) {
		return $http.get('/api/events/facebook/' + facebookId);
	};

	// delete all
	this.deleteEvents = function(facebookId) {
		return $http.delete('/api/events/facebook/' + facebookId);
	};

	return this;
});
