var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Event', new Schema({
	date: Date,
	start: Number
}));
