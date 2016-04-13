// set up
var express = require('express');
var mongoose = require('mongoose');
var database = require('./config/database');
var app = express();
var port = process.env.PORT || 8080;

// config
app.use(express.static(__dirname + '/public'));
mongoose.connect(database.url);

// routes
require('./app/routes.js')(app);

// listen
app.listen(port);
console.log("App listening on port " + port);

// test =======================================================================
var Schema = mongoose.Schema;

var testSchema = new Schema({
	title:  String,
	description: String
});

var Test = mongoose.model('Test', testSchema);
var entry = new Test({ title: 'Titel',  description: 'Beskrivning'});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connected!');
	entry.save(function (err, entry_) {
		if (err) return console.error(err);
		console.log('saved:\n' + entry_);
	});
	Test.find(function (err, entries) {
		if (err) return console.error(err);
		console.log('found:\n' + entries);
	})
});
