app.controller('FacebookCtrl', ['$scope', 'Facebook', function($scope, Facebook) {

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
    $scope.getLoginStatusStatus = '';
    $scope.getMeStatus = '';
    $scope.getFriendsStatus = '';
    $scope.loginStatus = '';
    $scope.logoutStatus = '';

    // internal helper function
    var fbIdToImgUrl = function(fbId) {
        var imgUrlHead = 'http://graph.facebook.com/';
        var imgUrlTail = '/picture?type=large';
        return imgUrlHead + fbId + imgUrlTail;
    };

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
        $scope.getLoginStatusStatus = 'Fetching login status...';
        Facebook.getLoginStatus()
            .then(function(response) {
                $scope.userLoginStatus = response.status;
                $scope.getLoginStatusStatus = 'Success fetching login status!';
            }, function(reason) {
                //console.log(reason);
                $scope.getLoginStatusStatus = reason;
            });
    };

    $scope.getMe = function() {
        $scope.getMeStatus = 'Fetching my FB information...';
        Facebook.api('/me')
            .then(function(response) {
                response.imgUrl = fbIdToImgUrl(response.id);
                $scope.me = response;
                $scope.getMeStatus = 'Success fetching my FB information!';
            }, function(reason) {
                $scope.getMeStatus = reason;
                //console.log(reason);
            });
    };

    $scope.getFriends = function() {
        $scope.getFriendsStatus = 'Fetching friends...';
        Facebook.api('/me/friends')
            .then(function(response) {
                    $scope.friends = [];
                    for (var i = 0; i < response.data.length; i++) {
                        var friend = response.data[i];
                        friend.imgUrl = fbIdToImgUrl(friend.id);
                        $scope.friends.push(friend);
                    }
                    $scope.getFriendsStatus = 'Success fetching friends!';
                },
                function(reason) {
                    //console.log(reason);
                    $scope.getFriendsStatus = reason;
                });
    };

    $scope.login = function() {
        $scope.loginStatus = 'Logging in...';
        var promise = Facebook.getLoginStatus()
            .then(function(response) {
                Facebook.login(response).then(function(lresponse) {
                    clearCache();
                    $scope.userLoginStatus = lresponse.status;
                    $scope.loginStatus = 'Success logging in!'
                        //console.log(lresponse);
                }, function(lreason) {
                    //console.log(lreason);
                    $scope.loginStatus = lreason;
                });
            }, function(reason) {
                $scope.loginStatus = reason;
                //console.log(reason);
            });
    };

    $scope.logout = function() {
        $scope.logoutStatus = 'Logging out..';
        var promise = Facebook.getLoginStatus()
            .then(function(response) {
                Facebook.logout(response).then(function(lresponse) {
                    clearCache();
                    $scope.userLoginStatus = lresponse.status;
                    $scope.logoutStatus = 'Success logging out!';
                    //console.log(lresponse);
                }, function(lreason) {
                    //console.log(lreason);
                    $scope.logoutStatus = lreason;
                });
            }, function(reason) {
                //console.log(reason);
                $scope.logoutStatus = reason;
            });
    };

}]);
