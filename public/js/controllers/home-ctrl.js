magenta.controller('HomeCtrl', function($scope, Planner) {

    $scope.login = function() {
        Planner.login()
            .then(function(response) {
                console.log(response);
            }).catch(function(error) {
                console.log(error);
            });
    }

});
