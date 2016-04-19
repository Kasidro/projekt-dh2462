magenta.factory('Planner', function(Storage, $q) {
    var events = [];
    var friends = [];
    var me = null;

    this.addEvent = function(guests, name, description) {
        var event = {
            "name": name,
            "owner": me,
            "description": description,
            "guests": guests,
            "days": []
        };

        return Storage.postEvent(event);
    };


    this.addDay = function(eventId) {}

    this.getEvent = function(eventID) {
        return Storage.getEvent(eventID);
    };

    this.addActivity = function(startTime, duration, date) {
        var activity = {
            "startTime": startTime,
            "duration": duration,
            "date": date
        };
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    }


    /* pretty empty here */

    return this;
});
