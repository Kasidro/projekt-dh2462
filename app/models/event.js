var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
	date: Date,
	start: Number,
	owner: String,
	guests: [String],
	activities: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Event', EventSchema);
