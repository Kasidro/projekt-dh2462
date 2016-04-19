var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
	name: String,
	length: Number,
	type: String,
	description: String
});

var DaySchema = new Schema({
	date: Date,
	activities: [ActivitySchema]
}); 

var EventSchema = new Schema({
	name: String,
	start: Number,
	owner: String,
	guests: [String],
	days: [DaySchema]
});

module.exports = mongoose.model('Event', EventSchema);
