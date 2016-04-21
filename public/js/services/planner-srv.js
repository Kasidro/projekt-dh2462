magenta.service('Planner', function($q, Facebook, Storage) {
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

    var fbLogin = function() {
        return Facebook.getLoginStatus()
            .then(Facebook.logout)
            .then(function(res) { console.log('FB logout succeded') })
            .catch(function(err) { console.log('FB logout failed') })
            .then(Facebook.getLoginStatus)
            .then(Facebook.login)
            .then(function(res) { console.log('FB login succeded'); loginStatus = res.status })
            .catch(function(err) { console.log('FB login failed') })
            .then(function() {
                var deferred = $q.defer();
                if (loginStatus === 'connected')
                    deferred.resolve('FB connection succeded');
                else
                    deferred.reject('FB connection failed');
                return deferred.promise;
            });
    }

    var fbFetch = function() {
        return Facebook.getMe()
            .then(function(res) { console.log('FB fetched me'); me = res })
            .then(Facebook.getFriends)
            .then(function(res) { console.log('FB fetched friends'); friends = res.data });
    }

    var dbFetch = function() {
        return Storage.getEvents(me.id)
            .then(function(res) { console.log('DB fetched events'); events = res.data });
    }

    this.login = function() {
        return fbLogin()
            .then(fbFetch)
            .then(dbFetch)
            .then(function() {
                var deferred = $q.defer();
                deferred.resolve('Login OK');
                return deferred.promise;
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

    this.addEventToModel = function(event) {
    	events.push(event);
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

        console.log(me.id);

        return Storage.postEvent(e)
            .then(function(resp) {
            	console.log(resp);
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

    this.editEvent = function(eID, title, description, guests) {
        var index = findEventIndex(eID);
        events[index].name = title;
        events[index].description = description;
        events[index].guests = guests;
        Storage.putEvent(eID, events[index]);
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
});
