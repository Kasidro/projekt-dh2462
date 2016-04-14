meetingPlannerApp.controller('TestController', function($scope, Tester) {

	var event0 = {
		date: new Date(),
		start: 10,
		owner: 'Tobias',
	};

	var activity0 = {
		name: 'Some activity',
		length: 60,
		type: 'Play',
		description: 'Very interesting'
	}

	Tester.postEvent(event0)
		.then(function(res) {
			console.log(res.data);
			Tester.getEvent(res.data._id)
				.then(function(res) {
					console.log(res.data);
				});
		});
});

console.log('controllers/test.js loaded');
