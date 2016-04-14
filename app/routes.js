var Event = require('./models/event');

module.exports = function(app) {

	app.post('/api/events', function(req, res) {
		var event = new Event();
		for (var p in req.body) event[p] = req.body[p];
		event.save(function(err) {
			if (err)
				res.send(err);
            res.json(event);
        });
	});

	app.get('/api/events/:id', function(req, res) {
		Event.findById(req.params.id, function(err, event) {
            if (err)
                res.send(err);
            res.json(event);
        });
	});
}
