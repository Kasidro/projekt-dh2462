meetingPlannerApp.controller('FacebookCtrl', ['$scope', 'facebookService', function($scope, facebookService) {

    //Holds user information
    $scope.me = {
        'id': '',
        'name': '',
        'imgUrl': '',
    };

    //Holds users friends
    $scope.friends = [];

    //Login status of current user, values:
    //"connected" : The person is logged into Facebook, and has logged into your app.
    //"not_authorized" : The person is logged into Facebook, but has not logged into your app.
    //"unknown" : The person is not logged into Facebook, so you don't know if they've logged into your app. Or FB.logout() was called before and therefore, it cannot connect to Facebook.
    $scope.userLoginStatus = 'unknown';

    //Fields holding status messages
    $scope.getLoginStatusStatus = '';
    $scope.getMeStatus = '';
    $scope.getFriendsStatus = '';
    $scope.loginStatus = '';
    $scope.logoutStatus = '';

    var fbIdToImgUrl = function(fbId) {
        var imgUrlHead = 'http://graph.facebook.com/';
        var imgUrlTail = '/picture?type=large';
        return imgUrlHead + fbId + imgUrlTail;
    };

    $scope.getLoginStatus = function() {
        $scope.getLoginStatusStatus = 'Fetching login status...';
        facebookService.getLoginStatus()
            .then(function(response) {
                //console.log(response);
                $scope.userLoginStatus = response.status;
                $scope.getLoginStatusStatus = 'Success fetching login status!';
            }, function(reason) {
                //console.log(reason);
                $scope.getLoginStatusStatus = reason;
            });
    };

    $scope.getMe = function() {
        $scope.getMeStatus = 'Fetching my FB information...';
        facebookService.api('/me')
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
        facebookService.api('/me/friends')
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
        var promise = facebookService.getLoginStatus()
            .then(function(response) {
                facebookService.login(response).then(function(lresponse) {
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
        var promise = facebookService.getLoginStatus()
            .then(function(response) {
                facebookService.logout(response).then(function(lresponse) {
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
