meetingPlannerApp.controller('PlannerController', function($scope, Planner) {

	Planner.getActivity('570efe8f539f061e14633a13')
		.then(function successCallback(response) {
			console.log(response)
		}, function errorCallback(response) {
			console.log(response)
		});

	Planner.postActivity()
		.then(function successCallback(response) {
			console.log(response)
		}, function errorCallback(response) {
			console.log(response)
		});

	
});

console.log('controllers/main.js loaded');
