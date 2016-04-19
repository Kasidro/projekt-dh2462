magenta.factory('Planner', function(Storage) {
    var friends = [];
    var me = {
        "id": "",
        "name": "",
        "imgUrl": ""
    };

    this.addEvent = function(guests, name, description) {
        var event = {
            "name": name,
            "owner": me.id,
            "description": description,
            "guests": guests,
            "days": []
        };

        return Storage.postEvent(event);
    };


    this.addDay = function(eventID, date, start) {
        // TODO
        // Handle days with same date 
    };

    this.getEvent = function(eventID) {
        return Storage.getEvent(eventID);
    };

    //Use eventID and date to find correct day to put activity
    this.addActivity = function(eventID, date, name, length, type, decription) {};

    return this;
});
