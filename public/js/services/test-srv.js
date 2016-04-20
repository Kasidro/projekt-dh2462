magenta.service('Test', function(Storage, Facebook) {
    // Facebook
    // ========================================================================

    // Holds user information
    var me = {
        'id': '',
        'name': '',
        // Stand in picture since setting this field to empty seems to keep previous picture from browser cache
        'imgUrl': 'http://images3.mtv.com/uri/mgid:uma:video:mtv.com:720643?width=100&height=150&crop=true&quality=0.85',
    }
    // Holds users friends
    var friends = [];
    // Login status of current user, values:
    // "connected" : The person is logged into Facebook, and has logged into your app.
    // "not_authorized" : The person is logged into Facebook, but has not logged into your app.
    // "unknown" : The person is not logged into Facebook, so you don't know if they've logged into your app. Or FB.logout() was called before and therefore, it cannot connect to Facebook.
    var userLoginStatus = 'unknown';
    // Fields holding status messages
    var statusString = '';

    // Login
    var login = function() {
        statusString = 'Logging in...';
        var promise = Facebook.getLoginStatus()
            .then(function(response) {
                Facebook.login(response).then(function(lresponse) {
                    getMe();
                    getFriends();
                    userLoginStatus = lresponse.status;
                    statusString = 'Success logging in!';
                }, function(lreason) {
                    statusString = lreason;
                });
            }, function(reason) {
                statusString = reason;
            });
    }
    var getMe = function() {
        statusString = 'Fetching my FB information...';
        Facebook.getMe()
            .then(function(response) {
                me = response;
                getEvents();
                statusString = 'Success fetching my FB information!';
            }, function(reason) {
                statusString = reason;
            });
    }
    var getFriends = function() {
        statusString = 'Fetching friends...';
        Facebook.getFriends()
            .then(function(response) {
                    friends = response.data;
                    statusString = 'Success fetching friends!';
                },
                function(reason) {
                    statusString = reason;
                });
    }

    // Logout
    var logout = function() {
        statusString = 'Logging out...';
        var promise = Facebook.getLoginStatus()
            .then(function(response) {
                Facebook.logout(response).then(function(lresponse) {
                    clearCache();
                    userLoginStatus = lresponse.status;
                    statusString = 'Success logging out!';
                }, function(lreason) {
                    statusString = lreason;
                });
            }, function(reason) {
                statusString = reason;
            });
    }
    var clearCache = function() {
        // Facebook
        me.id = '';
        me.name = '';
        me.imgUrl = 'http://images3.mtv.com/uri/mgid:uma:video:mtv.com:720643?width=100&height=150&crop=true&quality=0.85';
        friends = [];
        // Storage
        events = [];
    }

    // Not used
    /*
    // returns friend by id or null if that friend does not exist
    getFriend = function(id) {
        var friend = null;
        for (var i = 0; i < friends.length; i++) {
            if (friends[i].id === id) {
                friend = friends[i];
            }
        }
        return friend;
    }
    getLoginStatus = function() {
        statusString = 'Fetching login status...';
        Facebook.getLoginStatus()
            .then(function(response) {
                userLoginStatus = response.status;
                statusString = 'Success fetching login status!';
            }, function(reason) {
                statusString = reason;
            });
    }
    */

    // Storage
    // ========================================================================

    var events = [];

    var add = function() {
        if (userLoginStatus !== 'connected') return;
        var allFriends = [];
        for (i in friends) allFriends.push(friends[i].id);
        var dummyEvent = {
            name: 'Name',
            owner: me.id,
            guests: allFriends,
            description: 'Description',
            days: []
        }
        Storage.postEvent(dummyEvent)
            .then(function(res) {
                getEvents();
            });
    }

    var remove = function() {
        if (userLoginStatus !== 'connected') return;
        Storage.deleteEvents(me.id)
            .then(function(res) {
                getEvents();
            });
    }

    var getEvents = function() {
        Storage.getEvents(me.id)
            .then(function(res) {
                events = res.data;
            });
    }

    // CRUD test
    ;(function() {

        var activity0 = {
            name: 'Some activity',
            length: 60,
            type: 1,
            description: 'Very interesting'
        }

        var day0 = {
            date: new Date(1999,11,31),
            start: 10,
            activities: []
        }

        var event0 = {
            name: 'Das event',
            owner: 'Tobias',
            guests: 'Eric, Jakob, Johannes',
            description: 'Über event',
            days: []
        }
        

        // Create
        Storage.postEvent(event0)
            .then(function(res) {
                event0._id = res.data._id;
                console.log({
                    create_response: res.data
                });

                // Read
                Storage.getEvent(event0._id)
                    .then(function(res) {
                        console.log({
                            read_response: res.data
                        });

                        day0.activities.push(activity0);
                        event0.days.push(day0);

                        // Update
                        Storage.putEvent(event0._id, event0)
                            .then(function(res) {
                                console.log({
                                    update_response: res.data
                                });

                                // Delete
                                Storage.deleteEvent(event0._id)
                                    .then(function(res) {
                                        console.log({
                                            delete_response: res.data
                                        });
                                    });
                            });
                    });
            });
    })();

	this.getStatusString = function() { return statusString };
	this.getUserLoginStatus = function() { return userLoginStatus };
	this.getMe = function() { return me };
	this.getFriends = function() { return friends };
	this.getEvents = function() { return events };
	this.login = login;
	this.logout = logout;
	this.add = add;
	this.remove = remove;
});
