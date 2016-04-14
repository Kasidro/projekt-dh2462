var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
	name: String,
	length: Number,
	type: String,
	description: String
});

module.exports = mongoose.model('Activity', ActivitySchema);
