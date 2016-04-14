app.controller('StorageCtrl', function($scope, Storage) {

	var event0 = {
		date: new Date(),
		start: 10,
		owner: 'Tobias',
		guests: 'Eric, Jakob, Johannes'
	};

	var activity0 = {
		name: 'Some activity',
		length: 60,
		type: 'Play',
		description: 'Very interesting'
	}

	Storage.postEvent(event0)
		.then(function(res) {
			console.log(res.data);
			Storage.getEvent(res.data._id)
				.then(function(res) {
					console.log(res.data);
					res.data.activities.push(activity0);
					Storage.putEvent(res.data._id, res.data)
						.then(function(res) {
							console.log(res.data);
							Storage.deleteEvent(res.data._id)
								.then(function(res) {
									console.log(res.data);
								});
						});
				});
		});
});
