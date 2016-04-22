var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
	name: String,
	length: Number,
	type: Number,
	description: String
});

var DaySchema = new Schema({
	date: String,
	start: String,
	activities: [ActivitySchema]
}); 

var EventSchema = new Schema({
	name: String,
	owner: String,
	guests: [String],
	description: String,
	days: [DaySchema]
});

module.exports = mongoose.model('Event', EventSchema);
