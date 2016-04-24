magenta.service('Planner', function($q, $cookieStore, Facebook, Storage, Status) {

    // Data field
    // ========================================================================

    var loginStatus;
    var me = {
        "id": "",
        "name": "",
        "imgUrl": ""
    };
    var friends = [];
    var currentEvent;
    var currentDate;
    var currentPosition;
    var events = [];
    var dbFetched = false;

    // Cookie stuff
    // ========================================================================

    var setMe = function(_me) {
        me = _me;
        $cookieStore.put('me', me);
    };
    var setFriends = function(_friends) {
        friends = _friends;
        $cookieStore.put('friends', friends);
    };
    var setLoginStatus = function(_loginStatus) {
        loginStatus = _loginStatus;
        $cookieStore.put('loginStatus', loginStatus);
    };
    this.setCurrentEvent = function(_currentEvent) {
        currentEvent = _currentEvent;
        $cookieStore.put('currentEvent', currentEvent);
    };

    this.setCurrentDate = function(_currentDate) {
        currentDate = _currentDate;
        $cookieStore.put('currentDate', currentDate);
    };

    this.setCurrentActivityPosition = function(_currenPosition) {
        currentPosition =  _currenPosition;
        $cookieStore.put('currentPosition', currentPosition);
    }

    this.retrieveTempData = function() {
        loginStatus = $cookieStore.get('loginStatus');
        me = $cookieStore.get('me');
        friends = $cookieStore.get('friends');
        currentEvent = $cookieStore.get('currentEvent');
        currentDate = $cookieStore.get('currentDate');
        currentPosition = $cookieStore.get('currentPosition');
        console.log('Cookies retrived');
        return dbFetch();
    };
    var destroyTempData = function() {
        loginStatus = undefined;
        me = {
            "id": "",
            "name": "",
            "imgUrl": ""
        };
        friends = [];
        currentEvent = undefined;
        currentPosition = undefined;
        events = [];
        angular.forEach($cookieStore, function(v, k) {
            $cookieStore.remove(k);
        });
        console.log('Temporary data destroyed');
    };

    // Helper functions
    // ========================================================================

    // ei: int index of event in events
    // date: String date of day as "YYYY-MM-DD"
    // returns: int index of day or -1 if not in days
    var findDayIndex = function(ei, date) {
        if (ei !== -1) {
            for (var i = 0; i < events[ei].days.length; i++) {
                if (events[ei].days[i].date === date) {
                    return i;
                }
            }
        }
        return -1;
    };

    //eID: String event ID
    //returns: int index of event in events
    var findEventIndex = function(eID) {
        for (var i = 0; i < events.length; i++) {
            if (events[i]._id === eID) {
                return i;
            }
        }
        return -1;
    };

    var fbLogin = function() {
        return Facebook.getLoginStatus()
            .then(Facebook.logout)
            .then(function(res) { /*console.log('FB logout succeded')*/ })
            .catch(function(err) { /*console.log('FB logout failed')*/ })
            .then(Facebook.getLoginStatus)
            .then(Facebook.login)
            .then(function(res) {
                console.log('FB login succeded');
                setLoginStatus(res.status)
            })
            .catch(function(err) {
                console.log('FB login failed')
            })
            .then(function() {
                var deferred = $q.defer();
                if (loginStatus === 'connected')
                    deferred.resolve('FB connection succeded');
                else
                    deferred.reject('FB connection failed');
                return deferred.promise;
            });
    };

    var fbFetch = function() {
        return Facebook.getMe()
            .then(function(res) {
                console.log('FB fetched me');
                setMe(res)
            })
            .then(Facebook.getFriends)
            .then(function(res) {
                console.log('FB fetched friends');
                setFriends(res.data)
            });
    };


    var dbFetch = function() {
        return Storage.getEvents(me.id)
            .then(function(res) {
                console.log('DB fetched events');
                events = res.data;
                dbFetched = true
                console.log(res);
            });
    };

    var putEventToDB = function(eID, mEvent) {
        Storage.putEvent(eID, mEvent)
            .catch(function(error) {
                console.log(error);
                Status.setStatusMsg("Error updating DB");
            })
    }

    // Login/out
    // ========================================================================

    this.login = function() {
        return fbLogin()
            .then(fbFetch)
            .then(dbFetch);
    };

    this.logout = function() {
        destroyTempData();
        return Facebook.getLoginStatus()
            .then(Facebook.logout);
    };

    // Getters
    // ========================================================================

    this.isDbFetched = function() {
        return dbFetched;
    };

    this.getLoginStatus = function() {
        return loginStatus;
    };

    this.getCurrentEvent = function() {
        return currentEvent;
    };

    this.getEvents = function() {
        return events;
    };

    // eID: String event ID
    // returns: event or null
    this.getEvent = function(eID) {
        var ei = findEventIndex(eID);
        if (ei !== -1) {
            return events[ei];
        }
        return null;
    };

    // eID: String event ID
    // date: String date of day as "YYYY-MM-DD"
    // returns: array of days
    this.getDay = function(eID, date) {
        var ei = findEventIndex(eID);
        var di = findDayIndex(ei, date);
        if (ei !== -1 && di !== -1) {
            return events[ei].days[di];
        }
        return null;
    };

    // eID: String event ID
    // date: String date of day as "YYYY-MM-DD"
    // pos: int position of activity in activities
    // returns: activity
    this.getActivity = function(eID, date, pos) {
        var ei = findEventIndex(eID);
        var di = findDayIndex(ei, date);
        if (ei !== -1 && di !== -1 && typeof events[ei].days[di].activities[pos] !== 'undefined') {
            return events[ei].days[di].activities[pos];
        }
        return null;
    };

    this.getNewActivity = function() {
        return newActivity;
    }

    this.getCurrentDate = function() {
        return currentDate;
    }

    this.getCurrentActivityPosition = function() {
        return currentPosition;
    }

    this.getFriends = function() {
        return friends;
    };

    this.getMe = function() {
        return me;
    };

    // Setters
    // ========================================================================

    // Adders
    // ========================================================================
    // name: String
    // description: String
    // guests: Array of guests
    // returns: Promise from Storage API call
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
    };

    // eID: String event ID
    // date: String date of day as "YYYY-MM-DD"
    // returns: 0 on success, -1 otherwise
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
                var da = Date.parse(a.date);
                var db = Date.parse(b.date);
                return da - db;
            })
            putEventToDB(eID, events[ei]);
            return 0;
        }
        return -1;
    };

    // eID: String event ID
    // date: String date of day as "YYYY-MM-DD"
    // name: String
    // length: int
    // type: int
    // description: String
    // pos: int position of activity in activities
    // returns: 0 on success, -1 otherwise
    this.addActivity = function(eID, date, name, length, type, description, pos, color) {
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
                'description': description,
                'activityColor': color
            };

            if (pos == null) {
                activity.length = 0;
                events[ei].days[di].activities.push(activity);
            } else {
                events[ei].days[di].activities.splice(pos, 0, activity);
            }
            putEventToDB(eID, events[ei]);
            return 0;
        }
        return -1;
    };

    // eID: String event ID
    // returns: 0 on success, -1 otherwise
    this.editActivities = function(eID) {
        var index = findEventIndex(eID);
        if (index !== -1 &&
            events[index].owner === me.id
        ) {
            putEventToDB(eID, events[index]);
            return 0;
        }
        return -1;
    };

    // eID: String event ID
    // titel: String
    // guests: Array of guests
    // returns: 0 on success, -1 otherwise
    this.editEvent = function(eID, title, guests) {
        var index = findEventIndex(eID);
        if (index !== -1 &&
            events[index].owner === me.id
        ) {
            events[index].name = title;
            events[index].guests = guests;
            putEventToDB(eID, events[index]);
            return 0;
        }
        return -1;
    };


    this.editEventActivities = function() {
        var index = findEventIndex(eID);
        if (index !== -1 &&
            events[index].owner === me.id
        ) {
            putEventToDB(eID, events[index]);
            return 0;
        }
        return -1;
    };

    this.getColors = function() {
        var colors = ['#FF0000',
                      '#800080',
                      '#0000FF',
                      '#008080',
                      '#FF00FF',
                      '#808080',
                      '#008000',
                      '#800000',
                      '#000080',
                      '#00FF00'];
        return colors;
    }

    // eID: String event ID
    // date: String date of day as "YYYY-MM-DD"
    // newdate: String new date of day as "YYYY-MM-DD"
    // start: String start time as HH:MM
    // returns: 0 on success, -1 otherwise
    this.editDay = function(eID, date, newdate, start) {
        var ei = findEventIndex(eID);
        var di = findDayIndex(ei, date);
        var ndi = -1;
        if (newdate !== date) {
            var ndi = findDayIndex(ei, newdate);
        }
        if (ei !== -1 &&
            di !== -1 &&
            ndi === -1 &&
            events[ei].owner === me.id
        ) {
            events[ei].days[di].date = newdate;
            events[ei].days[di].start = start;
            events[ei].days.sort(function(a, b) {
                var da = Date.parse(a.date);
                var db = Date.parse(b.date);
                return da - db;
            })
            putEventToDB(eID, events[ei]);
            return 0;
        }
        return -1;
    };

    // eID: String event ID
    // date: String date of day as "YYYY-MM-DD"
    // name: String
    // length int
    // type int
    // description String
    // pos: int position of activity in activities
    // returns: 0 on success, -1 otherwise
    this.editActivity = function(eID, date, name, length, type, description, pos, color) {
        var ei = findEventIndex(eID);
        var di = findDayIndex(ei, date);

        if (ei !== -1 &&
            di !== -1 &&
            events[ei].owner === me.id &&
            events[ei].days[di].activities[pos] !== 'undefined'
        ) {
            events[ei].days[di].activities[pos].name = name;
            events[ei].days[di].activities[pos].length = length;
            events[ei].days[di].activities[pos].type = type;
            events[ei].days[di].activities[pos].description = description;
            events[ei].days[di].activities[pos].color = color;
            putEventToDB(eID, events[ei]);
            return 0;
        }
        return -1;
    };

    // Removers
    // ========================================================================

    // eID: String event ID
    // returns: 0 on success, -1 otherwise
    this.deleteEvent = function(eID) {
        var ei = findEventIndex(eID);
        if (ei !== -1 && events[ei].owner === me.id) {
            events.splice(ei, 1);
            Storage.deleteEvent(eID)
                .catch(function(error) {
                    console.log(error);
                    Status.setStatusMsg("Error updating DB");
                });
            return 0;
        }
        return -1;
    };
    // eID: String event ID
    // date: String date of day as "YYYY-MM-DD"
    // returns: 0 on success, -1 otherwise
    this.deleteDay = function(eID, date) {
        var ei = findEventIndex(eID);
        var di = findDayIndex(ei, date);
        if (ei !== -1 &&
            di !== -1 &&
            events[ei].owner === me.id) {
            events[ei].days.splice(di, 1);
            putEventToDB(eID, events[ei]);
            return 0;
        }
        return -1;
    };

    // eID: String event ID
    // date: String date of day as "YYYY-MM-DD"
    // pos: int position of activity in activities
    // returns: 0 on success, -1 otherwise
    this.deleteActivity = function(eID, date, pos) {
        var ei = findEventIndex(eID);
        var di = findDayIndex(ei, date);
        if (ei !== -1 &&
            di !== -1 &&
            events[ei].owner === me.id &&
            typeof events[ei].days[di].activities[pos] !== 'undefined') {
            events[ei].days[di].activities.splice(pos, 1);
            putEventToDB(eID, events[ei]);
            return 0;
        }
        return -1;
    };

    // Mover
    // ========================================================================

    // eID: String event ID
    // date: String date of day as "YYYY-MM-DD"
    // pos: int position of activity in activities
    // newpos: int new position of activity in activities
    // ndate: String new date of day as "YYYY-MM-DD"
    // description String
    // returns: 0 on success, -1 otherwise
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
            putEventToDB(eID, events[ei]);
            return 0;
        }
        return -1;
    };
});
