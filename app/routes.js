var Event = require('./models/event');
var Activity = require('./models/activity');

module.exports = function(app) {

	app.post('/api/activities/', function(req, res) {
		var activity = new Activity();
		for (var p in req.body) activity[p] = req.body[p];
		activity.save(function(err) {
			if (err)
				res.send(err);
            res.json({ id: activity._id });
        });
	});
	
	app.get('/api/activities/:id', function(req, res) {
		Activity.findById(req.params.id, function(err, activity) {
            if (err)
                res.send(err);
            res.json(activity);
        });
	});
}
