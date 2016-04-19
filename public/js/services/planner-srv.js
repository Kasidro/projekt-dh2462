magenta.factory('Planner', function(Storage, $q) {
	var events = [];
	var friends = [];
	var me = null;

	this.addEvent = function(guests, name, description) {
		var event = {"name": name, "owner":me, "description": description,  "guests":guests, "days": []};

		var eventID;
            var deferred = $q.defer();
            Storage.postEvent(event, function(response) {
                if (!response || response.error) {
                    deferred.reject('error posting the event');
                    console.log(response + " reject");
                } else {
                    deferred.resolve(response);
                    console.log(response + " resolved");
                }
            });
            return deferred.promise;
	}


	this.addDay = function(eventId) {
		var event = getEvent(eventId);



		if (event.days.length === 0) {
			var day = {"startTime": event.startTime, "startDate": event.startDate, "activities": []};
		}

		else {
			var day = {"startTime": event.startTime, "activities": []};
		}
	
		getEvent(eventId).days.push();
	}

	this.getEvent = function(eventID) {
		Storage.getEvent(eventID)
                    .then(function(res) {
                    	return res;
                    }, function(error) {
                    	console.log(error);
                    	return null;
                    });
	}

	this.addActivity = function(startTime, duration, date) {
		var activity = {"startTime": startTime, "duration": duration, "date": date};
	}

	function addDays(date, days) {
    	var result = new Date(date);
    	result.setDate(date.getDate() + days);
    	return result;
	}


	/* pretty empty here */
	
	return this;
});
