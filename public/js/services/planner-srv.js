magenta.factory('Planner', function($q, Facebook, Storage) {
    var me = {
        "id": "",
        "name": "",
        "imgUrl": ""
    };
    var friends = [];
    var events = [];
    var loginStatus = 'unknown';

    var findDayIndex = function(eIndex, date) {
        if (eIndex !== -1) {
            for (var i = 0; i < events[eIndex].days.length; i++) {
                if (events[eIndex].days[i].date === date) {
                    return i;
                }
            }
        }
        return -1;
    }

    var findEventIndex = function(eventID) {
        for (var i = 0; i < events.length; i++) {
            if (events[i]._id === eventID) {
                return i;
            }
        }
        return -1;
    }

    var readFromDB = function() {
        return Storage.getEvents(me.id)
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
            })
            .then(Facebook.getFriends)
            .then(function(resp) {
                friends = resp.data;
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

    this.logout = function() {
        return Facebook.getLoginStatus()
            .then(Facebook.logout)
            .then(function(resp) {
                loginStatus = resp.status;
                me = {
                    "id": "",
                    "name": "",
                    "imgUrl": ""
                };
                friends = [];
                events = [];
                return $q.resolve('Logout OK');
            });
    };

    //Getters
    this.getEvents = function() {
        return events;
    };

    this.getEvent = function(eventID) {
        return events[findEventIndex(eventID)];
    };

    this.getFriends = function() {
        return friends;
    };

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
                events.push(resp.data);
                return $q.resolve(resp.data._id);
            });
    };

    this.addDay = function(eventID, date, start) {
        eIndex = findEventIndex(eventID);
        if (findDayIndex(eIndex, date) === -1) {
            var day = {
                'date': date,
                'start': start,
                'activities': []
            };
            events[eIndex].days.push(day);
            events[eIndex].days.sort(function(a, b) {
                return a.date - b.date;
            });
            // not working for some reason, craches webserver
            //Storage.putEvent(eventID, events[eIndex]);
        }
    };

    //Use eventID and date to find correct day to put activity
    this.addActivity = function(eventID, date, name, length, type, decription) {};

    return this;
});
