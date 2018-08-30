var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var person = new Schema({
    personId: String,
    frequency: Number,
    userId: String,
    firstName: String,
    lastName: String, 
});

var People = mongoose.model('People', person);

module.exports = People;

