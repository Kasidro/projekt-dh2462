magenta.controller('TestCtrl', function($scope, Facebook, Storage, rfc4122) {

    // Facebook
    // ========================================================================

    // Holds user information
    $scope.me = {
        'id': '',
        'name': '',
        // Stand in picture since setting this field to empty seems to keep previous picture from browser cache
        'imgUrl': 'http://images3.mtv.com/uri/mgid:uma:video:mtv.com:720643?width=100&height=150&crop=true&quality=0.85',
    };
    // Holds users friends
    $scope.friends = [];
    // Login status of current user, values:
    // "connected" : The person is logged into Facebook, and has logged into your app.
    // "not_authorized" : The person is logged into Facebook, but has not logged into your app.
    // "unknown" : The person is not logged into Facebook, so you don't know if they've logged into your app. Or FB.logout() was called before and therefore, it cannot connect to Facebook.
    $scope.userLoginStatus = 'unknown';
    // Fields holding status messages
    $scope.statusString = '';
    
    // Login
    $scope.login = function() {
        $scope.statusString = 'Logging in...';
        var promise = Facebook.getLoginStatus()
            .then(function(response) {
                Facebook.login(response).then(function(lresponse) {
                    getMe();
                    getFriends();
                    $scope.userLoginStatus = lresponse.status;
                    $scope.statusString = 'Success logging in!';
                }, function(lreason) {
                    $scope.statusString = lreason;
                });
            }, function(reason) {
                $scope.statusString = reason;
            });
    };
    var getMe = function() {
        $scope.statusString = 'Fetching my FB information...';
        Facebook.getMe()
            .then(function(response) {
                $scope.me = response;
                getEvents();
                $scope.statusString = 'Success fetching my FB information!';
            }, function(reason) {
                $scope.statusString = reason;
            });
    };
    var getFriends = function() {
        $scope.statusString = 'Fetching friends...';
        Facebook.getFriends()
            .then(function(response) {
                    $scope.friends = response.data;
                    $scope.statusString = 'Success fetching friends!';
                },
                function(reason) {
                    $scope.statusString = reason;
                });
    };

    // Logout
    $scope.logout = function() {
        $scope.statusString = 'Logging out...';
        var promise = Facebook.getLoginStatus()
            .then(function(response) {
                Facebook.logout(response).then(function(lresponse) {
                    clearCache();
                    $scope.userLoginStatus = lresponse.status;
                    $scope.statusString = 'Success logging out!';
                }, function(lreason) {
                    $scope.statusString = lreason;
                });
            }, function(reason) {
                $scope.statusString = reason;
            });
    };
    var clearCache = function() {
        // Facebook
        $scope.me.id = '';
        $scope.me.name = '';
        $scope.me.imgUrl = 'http://images3.mtv.com/uri/mgid:uma:video:mtv.com:720643?width=100&height=150&crop=true&quality=0.85';
        $scope.friends = [];
        $scope.userLoginStatus = 'not_connected';
        // Storage
        $scope.events = [];
    };

    // Not used
    /*
    // returns friend by id or null if that friend does not exist
    $scope.getFriend = function(id) {
        var friend = null;
        for (var i = 0; i < $scope.friends.length; i++) {
            if ($scope.friends[i].id === id) {
                friend = $scope.friends[i];
            }
        }
        return friend;
    };
    $scope.getLoginStatus = function() {
        $scope.statusString = 'Fetching login status...';
        Facebook.getLoginStatus()
            .then(function(response) {
                $scope.userLoginStatus = response.status;
                $scope.statusString = 'Success fetching login status!';
            }, function(reason) {
                $scope.statusString = reason;
            });
    };
    */

    // Storage
    // ========================================================================

    $scope.events = [];

    $scope.add = function() {
        if ($scope.userLoginStatus !== 'connected') return;
        var allFriends = [];
        for (i in $scope.friends) allFriends.push($scope.friends[i].id);
        var dummyEvent = {
            date: new Date(),
            start: 10,
            owner: $scope.me.id,
            guests: allFriends,
            activities: [{
                name: 'Some activity',
                length: 60,
                type: 'Play',
                description: 'Very interesting'
            }]
        }
        Storage.postEvent(dummyEvent)
            .then(function(res) {
                getEvents();
            });
    }

    $scope.remove = function() {
        if ($scope.userLoginStatus !== 'connected') return;
        Storage.deleteEvents($scope.me.id)
            .then(function(res) {
                getEvents();
            });
    };

    var getEvents = function() {
        Storage.getEvents($scope.me.id)
            .then(function(res) {
                $scope.events = res.data;
            });
    };

    // CRUD test
    (function() {

        var event0 = {
            date: new Date(),
            start: 10,
            owner: 'Tobias',
            guests: 'Eric, Jakob, Johannes',
            activities: []
        };

        var activity0 = {
            name: 'Some activity',
            length: 60,
            type: 'Play',
            description: 'Very interesting'
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

                        // Update
                        event0.activities.push(activity0);
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
});
