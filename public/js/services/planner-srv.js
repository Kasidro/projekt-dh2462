magenta.factory('Planner', function($q, Facebook, Storage) {
    var friends = [];
    var me = {
        "id": "",
        "name": "",
        "imgUrl": ""
    };
    var events = [];
    var loginStatus = 'unknown';

    var readFromDB = function() {
        return Storage.getEvent(me.id)
            .then(function(resp) {
                events = resp.data;
                return $q.resolve(resp);
            });
    };

    var tryLogin = function() {
        return Facebook.getLoginStatus()
            .then(Facebook.login)
            .then(function(resp) {
                loginStatus = resp.status;
                return $q.resolve(resp);
            })
            .then(Facebook.getMe)
            .then(function(resp) {
                me = resp;
                return $q.resolve(resp);
            });
    };

    this.login = function() {
        return tryLogin()
            .then(readFromDB)
            .then(function() {
                return $q.resolve('Login OK');
            });
    };

    //Getters
    this.getEvents = function() {
        return events;
    }

    this.getEvent = function(eventID) {
        for (e in events) {
            if (e._id === eventID) {
                return e;
            }
        }
        return null;
    }

    //Adders
    this.addEvent = function(guests, name, description) {
        var e = {
            "name": name,
            "owner": me.id,
            "description": description,
            "guests": guests,
            "days": []
        };

        return Storage.postEvent(e)
            .then(function(resp) {
                return $q.resolve(resp.data._id);
            });
    };

    this.addDay = function(eventID, date, start) {
        // TODO
        // Handle days with same date 
    };

    //Use eventID and date to find correct day to put activity
    this.addActivity = function(eventID, date, name, length, type, decription) {};

    return this;
});
