app.controller('FacebookCtrl', function($scope,Storage, Facebook) {

    //Holds user information
    $scope.me = {
        'id': '',
        'name': '',
        'imgUrl': 'http://images3.mtv.com/uri/mgid:uma:video:mtv.com:720643?width=100&height=150&crop=true&quality=0.85',
    };

    //Holds users friends
    $scope.friends = [];

    //Login status of current user, values:
    //"connected" : The person is logged into Facebook, and has logged into your app.
    //"not_authorized" : The person is logged into Facebook, but has not logged into your app.
    //"unknown" : The person is not logged into Facebook, so you don't know if they've logged into your app. Or FB.logout() was called before and therefore, it cannot connect to Facebook.
    $scope.userLoginStatus = '';

    //Fields holding status messages
    $scope.statusString = '';

    var clearCache = function() {
        $scope.me.id = '';
        $scope.me.name = '';
        $scope.me.imgUrl = 'http://images3.mtv.com/uri/mgid:uma:video:mtv.com:720643?width=100&height=150&crop=true&quality=0.85';
        $scope.friends = [];
    };

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
                //console.log(reason);
                $scope.statusString = reason;
            });
    };

    $scope.getMe = function() {
        $scope.statusString = 'Fetching my FB information...';
        Facebook.getMe()
            .then(function(response) {
                //response.imgUrl = fbIdToImgUrl(response.id);
                $scope.me = response;
                $scope.statusString = 'Success fetching my FB information!';
            }, function(reason) {
                $scope.statusString = reason;
                //console.log(reason);
            });
    };

    $scope.getFriends = function() {
        $scope.statusString = 'Fetching friends...';
        Facebook.getFriends()
            .then(function(response) {
                    $scope.friends = [];
                    for (var i = 0; i < response.data.length; i++) {
                        var friend = response.data[i];
                        $scope.friends.push(friend);
                    }
                    $scope.statusString = 'Success fetching friends!';
                },
                function(reason) {
                    //console.log(reason);
                    $scope.statusString = reason;
                });
    };

    $scope.login = function() {
        $scope.statusString = 'Logging in...';
        var promise = Facebook.getLoginStatus()
            .then(function(response) {
                Facebook.login(response).then(function(lresponse) {
                    clearCache();
                    $scope.userLoginStatus = lresponse.status;
                    $scope.statusString = 'Success logging in!'
                        //console.log(lresponse);
                }, function(lreason) {
                    //console.log(lreason);
                    $scope.statusString = lreason;
                });
            }, function(reason) {
                $scope.statusString = reason;
                //console.log(reason);
            });
    };

    $scope.logout = function() {
        $scope.statusString = 'Logging out..';
        var promise = Facebook.getLoginStatus()
            .then(function(response) {
                Facebook.logout(response).then(function(lresponse) {
                    clearCache();
                    $scope.userLoginStatus = lresponse.status;
                    $scope.statusString = 'Success logging out!';
                    //console.log(lresponse);
                }, function(lreason) {
                    //console.log(lreason);
                    $scope.statusString = lreason;
                });
            }, function(reason) {
                //console.log(reason);
                $scope.statusString = reason;
            });
    };

});
