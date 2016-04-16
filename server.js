// set up
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var database = require('./config/database');
var app = express();
var port = process.env.PORT || 8000;

// config
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
mongoose.connect(database.url);

// routes
require('./app/routes.js')(app);

// listen
console.log('Starting...');
mongoose.connection
	.on('error', console.error.bind(console, 'Connection error:'));
	.once('open', function() {
		console.log('Connected to MongoDB');
		app.listen(port);
		console.log('Server listening on port ' + port);
	});
