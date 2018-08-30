var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = new Schema({
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String, 
});

var Users = mongoose.model('Users', user);

module.exports = Users;

