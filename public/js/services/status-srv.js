magenta.service('Status', function($rootScope, $timeout) {

    var statusMsg;

    this.setStatusMsg = function(_statusMsg) {
        statusMsg = _statusMsg;
        $rootScope.$broadcast('STATUS_MSG', statusMsg);
        $timeout(function() {
            statusMsg = undefined;
            $rootScope.$broadcast('STATUS_MSG', statusMsg);
        }, 1500);
    };

    this.getStatusMsg = function() {
        return statusMsg;
    };
});
