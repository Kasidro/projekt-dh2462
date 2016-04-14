app.factory('Facebook', ['$q', function($q) {
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

        // takes response from getLoginStatus as arg to check if user is allready logged in
        login: function(sresponse) {
            var deferred = $q.defer();
            if (sresponse.status != 'connected') {
                FB.login(function(response) {
                    if (!response || response.error) {
                        deferred.reject('Login Status Error');
                    } else {
                        deferred.resolve(response);
                    }
                }, {
                    scope: 'user_friends,user_events'
                });
            } else {
                deferred.reject('User Allready Logged In');
            }
            return deferred.promise;
        },

        // takes response from getLoginStatus as arg to check if user is allready logged in
        logout: function(sresponse) {
            var deferred = $q.defer();
            if (sresponse.status == 'connected') {
                FB.logout(function(response) {
                    if (!response || response.error) {
                        deferred.reject('Logout Status Error');
                    } else {
                        deferred.resolve(response);
                    }
                });
            } else {
                deferred.reject('User Allready Logged Out');
            }
            return deferred.promise;
        },
        //Call the Graph api with api_call_string as defined FB 
        api: function(api_call_string) {
            var deferred = $q.defer();
            FB.api(api_call_string,
                function(response) {
                    if (!response || response.error) {
                        deferred.reject(api_call_string + ' Error');
                    } else {
                        deferred.resolve(response);
                    }
                });
            return deferred.promise;
        }
    }
}]);
