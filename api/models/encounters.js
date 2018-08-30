var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var encounter = new Schema({
	typeofCommunication: Number,
	encounterId: String,
	start: Date,
	end: Date,
	title: String,
	encounterDescription: String,
	userId: String,
	people: [String],
});

var Encounters = mongoose.model('Encounters', encounter);

module.exports = Encounters;

