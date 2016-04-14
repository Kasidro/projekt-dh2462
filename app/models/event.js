var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
	name: String,
	length: Number,
	type: String,
	description: String
});

var EventSchema = new Schema({
	date: Date,
	start: Number,
	owner: String,
	guests: [String],
	activities: [ActivitySchema]
});

module.exports = mongoose.model('Event', EventSchema);
