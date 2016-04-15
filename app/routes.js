var Event = require('./models/event');

module.exports = function(app) {

	// create
	app.post('/api/events', function(req, res) {
		var event = new Event();
		for (var p in req.body) event[p] = req.body[p];
		event.save(function(err) {
			if (err)
				res.send(err);
			res.json(event);
		});
	});

	// read
	app.get('/api/events/:id', function(req, res) {
		Event.findById(req.params.id, function(err, event) {
			if (err)
				res.send(err);
			res.json(event);
		});
	});

	// update
	app.put('/api/events/:id', function(req, res) {
		Event.findById(req.params.id, function(err, event) {
			if (err)
				res.send(err);
			for (var p in req.body) event[p] = req.body[p];
			event.save(function(err) {
				if (err)
					res.send(err);
				res.json(event);
			});
		});
	});

	// delete
	app.delete('/api/events/:id', function(req, res) {
		Event.remove({ _id: req.params.id }, function(err, info) {
			if (err)
				res.send(err);
			res.json(info);
		});
	});

	// read all
	app.get('/api/events/facebook/:id', function(req, res) {
		Event.find({
			$or: [
				{owner: req.params.id},
				{guests: req.params.id}
			]
		}, function(err, events) {
			if (err)
				res.send(err);
			res.json(events);
		});
	});

	// delete all
	app.delete('/api/events/facebook/:id', function(req, res) {
		Event.remove( {owner: req.params.id }, function(err, info) {
			if (err)
				res.send(err);
			res.json(info);
		});
	});

	// otherwise
	app.get('*', function(req, res) {
		res.redirect('/#/home');
	});
}
