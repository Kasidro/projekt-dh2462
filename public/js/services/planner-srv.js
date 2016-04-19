magenta.factory('Planner', function(rfc4122) {
	var events = [];
	var friends = [];
	var me = null;

	this.addEvent = function(startTime, date, guests) {
		var event = {"id":rfc4122.v4(), "owner":me.id, "startTime":startTime, "date": date, "guests":guests, "days": []};
		events.push(events);
	}

	this.addDay = function(eventId) {
		var event = getEvent(eventId);

		if (event.days.length === 0) {
			var day = {"startTime": event.startTime, "startDate": event.startDate, "activities": []}
		}

		else {
			var day = {"startTime": event.startTime, , "activities": []}
		}
	
		getEvent(eventId).days.push() 
	}

	this.getEvent = function(eventId) {
		for (key in events) {
			if (events[key].id === eventId) {
				return events[key];
			}
		}
		return null;
	}

	this.addActivity = function(startTime, duration, date) {
		var activity = {"startTime:" startTime, "duration": duration, "date", data};
	}

	function addDays(date, days) {
    	var result = new Date(date);
    	result.setDate(date.getDate() + days);
    	return result;
	}


	/* pretty empty here */
	
	return this;
});
