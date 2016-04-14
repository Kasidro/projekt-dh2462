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
		Event.remove(req.params.id, function(err, event) {
            if (err)
                res.send(err);
            res.json(req.params.id + 'successfully deleted');
        });
	});
}
