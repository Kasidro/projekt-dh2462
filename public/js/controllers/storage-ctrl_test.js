app.controller('StorageCtrl', function($scope, Storage, Facebook) {

	$scope.status = 'unconnected';
	$scope.me;
	$scope.friends;
	$scope.events;

	$scope.login = function() {
		Facebook.getLoginStatus()
			.then(function(res) {
				Facebook.login(res)
					.then(function(res) {
						$scope.status = res.status;
						Facebook.api('/me').then(function(response) {
							$scope.me = response;
							getEvents();
						});
						Facebook.api('/me/friends').then(function(response) {
							$scope.friends = response.data;
						});
					});
			});
	};

	$scope.add = function() {

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

	var crudTest = (function() {

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

		// create
		Storage.postEvent(event0)
			.then(function(res) {
				event0._id = res.data._id;
				console.log( {create_response: res.data} );

				// read
				Storage.getEvent(event0._id)
					.then(function(res) {
						console.log( {read_response: res.data} );

						// update
						event0.activities.push(activity0);
						Storage.putEvent(event0._id, event0)
							.then(function(res) {
								console.log( {update_response: res.data} );

								// delete
								Storage.deleteEvent(event0._id)
									.then(function(res) {
										console.log( {delete_response: res.data} );
									});
							});
					});
			});
	})();
});
