magenta.factory('Planner', function($q, Facebook, Storage) {
    var me = {
        "id": "",
        "name": "",
        "imgUrl": ""
    }
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
                return resp;
            });
    }

    var tryLogin = function() {
        return Facebook.getLoginStatus()
            .then(Facebook.login)
            .then(function(resp) {
                loginStatus = resp.status;
                return resp;
            })
            .then(Facebook.getMe)
            .then(function(resp) {
                me = resp;
                return resp;
            })
            .then(Facebook.getFriends)
            .then(function(resp) {
                friends = resp.data;
                return resp;
            });
    }

    this.login = function() {
        return tryLogin()
            .then(readFromDB)
            .then(function() {
                return 'Login OK';
            });
    }

    this.logout = function() {
        return Facebook.getLoginStatus()
            .then(Facebook.logout)
            .then(function(resp) {
                loginStatus = resp.status;
                me = {
                    "id": "",
                    "name": "",
                    "imgUrl": ""
                }
                friends = [];
                events = [];
                return 'Logout OK';
            });
    }

    //Getters
    this.getEvents = function() {
        return events;
    }

    this.getEvent = function(eventID) {
        return events[findEventIndex(eventID)];
    }

    this.getFriends = function() {
        return friends;
    }

    //Adders
    this.addEvent = function(name, description, guests) {
        var e = {
            "name": name,
            "owner": me.id,
            "description": description,
            "guests": guests,
            "days": []
        }

        return Storage.postEvent(e)
            .then(function(resp) {
                events.push(resp.data);
                return resp;
            });
    }

    this.addDay = function(eventID, date, start) {
        eIndex = findEventIndex(eventID);
        if (findDayIndex(eIndex, date) === -1) {
            var day = {
                'date': date,
                'start': start,
                'activities': []
            }
            events[eIndex].days.push(day);
            events[eIndex].days.sort(function(a, b) {
                return a.date - b.date;
            })
            Storage.putEvent(eventID, events[eIndex]);
        }
    }

    this.addActivity = function(eventID, date, name, length, type, decription) {
        //Use eventID and date to find correct day to put activity
    }

    return this;
});
