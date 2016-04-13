var mongoose = require('mongoose');
mongoose.connect('mongodb://mpUserAdmin:mpPassword@droplet.johansson.xyz/meeting-planner');

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
