var Event = require('./models/event');

module.exports = function(app) {

	var save = function(res, event, data) {
		for (var p in data) {
			if (p.charAt(0) !== '_')
				event[p] = data[p];
		}
		event.save(function(err) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(event);
		});
	};

	// create
	app.post('/api/events', function(req, res) {
		save(res, new Event(), req.body);
	});

	// read
	app.get('/api/events/:id', function(req, res) {
		Event.findById(req.params.id, function(err, event) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(event);
		});
	});

	// update
	app.put('/api/events/:id', function(req, res) {
		Event.findById(req.params.id, function(err, event) {
			if (err) {
				res.send(err);
				return;
			}
			save(res, event, req.body);
		});
	});

	// delete
	app.delete('/api/events/:id', function(req, res) {
		Event.remove({ _id: req.params.id }, function(err, info) {
			if (err) {
				res.send(err);
				return;
			}
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
			if (err) {
				res.send(err);
				return;
			}
			res.json(events);
		});
	});

	// delete all
	app.delete('/api/events/facebook/:id', function(req, res) {
		Event.remove( {owner: req.params.id }, function(err, info) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(info);
		});
	});

	// otherwise
	app.get('*', function(req, res) {
		res.redirect('/#/');
	});
};
