magenta.factory('Planner', function(Facebook, Storage) {
    var me = {
        "id": "",
        "name": "",
        "imgUrl": ""
    }
    var friends = [];
    var events = [];
    var loginStatus = 'unknown';

    var findDayIndex = function(ei, date) {
        if (ei !== -1) {
            for (var i = 0; i < events[ei].days.length; i++) {
                if (events[ei].days[i].date === date) {
                    return i;
                }
            }
        }
        return -1;
    }

    var findEventIndex = function(eID) {
        for (var i = 0; i < events.length; i++) {
            if (events[i]._id === eID) {
                return i;
            }
        }
        return -1;
    }

    var readFromDB = function() {
        return Storage.getEvents(me.id)
            .then(function(resp) {
                events = resp.data;
                console.log(events);
                return resp;
            });
    }

    var tryLogin = function() {}

    this.login = function() {
        return Facebook.getLoginStatus().then(function(resp) {
            console.log('past gls');
            if (resp.status === 'connected') {
                console.log('allready connected');
                Facebook.getFriends();
                Facebook.getMe().then(function(resp) {
                    console.log('getting my data');
                    me = resp;
                    readFromDB();
                });
            } else {
                console.log('trying to log in');
                Facebook.login().then(function(resp) {
                    console.log('logged in');
                    console.log(resp);
                    Facebook.getFriends();
                    Facebook.getMe().then(function(resp) {
                        console.log('getting my data');
                        me = resp;
                        readFromDB();
                    });
                });
            }
        });
    }

    this.logout = function() {}

    //Getters
    this.getEvents = function() {
        return events;
    }

    this.getEvent = function(eID) {
        var ei = findEventIndex(eID);
        if (ei !== -1) {
            return events[ei];
        }
        return null;
    }

    this.getDay = function(eID, date) {
        var ei = findEventIndex(eID);
        var di = findDayIndex(ei, date);
        if (ei !== -1 && di !== -1) {
            return events[ei].days[di];
        }
        return null;
    }

    this.getActivity = function(eID, date, pos) {
        var ei = findEventIndex(eID);
        var di = findDayIndex(ei, date);
        if (ei !== -1 && di !== -1 && typeof events[ei].days[di].activities[pos] !== 'undefined') {
            return getActByIdx(eID, di, pos);
        }
        return null;
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

    this.addDay = function(eID, date, start) {
        ei = findEventIndex(eID);
        if (findDayIndex(ei, date) === -1 && events[ei].owner === me.id) {
            var day = {
                'date': date,
                'start': start,
                'activities': []
            };
            events[ei].days.push(day);
            events[ei].days.sort(function(a, b) {
                return a.date - b.date;
            })
            Storage.putEvent(eID, events[ei]);
            return 0;
        }
        return -1;
    }

    this.addActivity = function(eID, date, name, length, type, description, pos) {
        var ei = findEventIndex(eID);
        var di = findDayIndex(ei, date);
        if (ei !== -1 &&
            di !== -1 &&
            events[ei].owner === me.id &&
            events[ei].days[di].activities[pos] !== 'undefined'
        ) {
            var activity = {
                'name': name,
                'length': length,
                'type': type,
                'decription': description
            };

            if (pos == null) {
                events[ei].days[di].activities.push(activity);
            } else {
                events[ei].days[di].activities.splice(pos, 0, activity);
            }
            Storage.putEvent(eID, events[ei]);
            return 0;
        }
        return -1;
    }

    //Removers
    this.deleteEvent = function(eID) {
        var ei = findEventIndex(eID);
        if (ei !== -1 && events[ei].owner === me.id) {
            events.splice(ei, 1);
            Storage.deleteEvent(eID);
            return 0;
        }
        return -1;
    }

    this.deleteDay = function(eID, date) {
        var ei = findEventIndex(eID);
        var di = findDayIndex(ei, date);
        if (ei !== -1 &&
            di !== -1 &&
            events[ei].owner === me.id) {
            events[ei].days.splice(di, 1);
            Storage.putEvent(eID, events[ei]);
            return 0;
        }
        return -1;
    }

    this.deleteActivity = function(eID, date, pos) {
        var ei = findEventIndex(eID);
        var di = findDayIndex(ei, date);
        if (ei !== -1 &&
            di !== -1 &&
            events[ei].owner === me.id &&
            typeof events[ei].days[di].activities[pos] !== 'undefined') {
            events[ei].days[di].activities.splice(pos, 1);
            Storage.putEvent(eID, events[ei]);
            return 0;
        }
        return -1;
    }

    // Mover
    this.moveActivity = function(eID, date, pos, newpos, ndate) {
        var ei = findEventIndex(eID);
        var di = findDayIndex(ei, date);
        var ndi = di;
        if (date !== ndate) {
            ndi = findDayIndex(ei, ndate);
        }

        if (ei !== -1 &&
            di !== -1 &&
            ndi !== -1 &&
            events[ei].owner === me.id &&
            typeof events[ei].days[di].activities[pos] !== 'undefined') {
            if (newpos > pos && newpos < events[ei].days[di].activities.length - 1) {
                newpos--;
            }
            var activity = events[ei].days[di].activities[pos];
            events[ei].days[di].activities.splice(pos, 1);
            events[ei].days[ndi].activities.splice(newpos, 0, activity);
            Storage.putEvent(eID, events[ei]);
            return 0;
        }
        return -1;
    }

    return this;
});
