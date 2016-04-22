magenta.factory('Facebook', function($q) {

    // internal helper function
    var fbIdToImgUrl = function(fbId) {
        var imgUrlHead = 'http://graph.facebook.com/';
        var imgUrlTail = '/picture?type=large';
        return imgUrlHead + fbId + imgUrlTail;
    };

    return {
        getLoginStatus: function() {
            var deferred = $q.defer();
            FB.getLoginStatus(function(response) {
                if (!response || response.error) {
                    deferred.reject('Get Login Status Error');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        },

        login: function(sresponse) {
            var deferred = $q.defer();
            if (sresponse.status != 'connected') {
                FB.login(function(response) {
                    if (!response || response.error)
                        deferred.reject('Login Status Error');
                    else
                        deferred.resolve(response);
                },{
                    scope: 'user_friends,user_events'
                });
            }
            else
                deferred.reject('User Allready Logged In');    
            return deferred.promise;
        },

        logout: function(sresponse) {
            var deferred = $q.defer();
            if (sresponse.status == 'connected') {
                FB.logout(function(response) {
                    if (!response || response.error)
                        deferred.reject('Logout Status Error');
                    else
                        deferred.resolve(response);
                });
            }
            else
                deferred.reject('User Allready Logged Out');
            return deferred.promise;
        },

        getMe: function() {
            var deferred = $q.defer();
            FB.api('/me', function(response) {
                if (!response || response.error) {
                    deferred.reject('Error getting me');
                } else {
                    response.imgUrl = fbIdToImgUrl(response.id);
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        },

        getFriends: function() {
            var deferred = $q.defer();
            FB.api('/me/friends', function(response) {
                if (!response || response.error) {
                    deferred.reject('Error getting friends');
                } else {
                    for (var i = 0; i < response.data.length; i++) {
                        response.data[i].imgUrl = fbIdToImgUrl(response.data[i].id);
                    }
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
});
