var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  Users = require('./api/models/users.js'), //created model loading here
  People = require('./api/models/people.js'),
  Encounters = require('./api/models/encounters.js'),
  bodyParser = require('body-parser'),
  https = require('https'),
  fs = require('fs');
  app.set('port', process.env.PORT || 3000);

  // Load the SDK for JavaScript
var AWS = require('aws-sdk');

var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;
// Set the region 
AWS.config.update({region: 'us-west-2'});
  // mongoose instance connection url connection
  mongoose.Promise = global.Promise;
  var opts = {
    server: {
        socketOptions:{keepAlive: 1}
    },
    useMongoClient: true,
};
  var connectionString = process.env.connectionString;
  mongoose.connect(connectionString, opts);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());



var routes = require('./api/routes/routes.js'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(app.get('port'));
/*
var options = {
  key: fs.readFileSync(__dirname +'/credentials/api.pem'),
  cert: fs.readFileSync(__dirname +'/credentials/api.crt')
};
*/ 
//var httpsServer = https.createServer(options, app);
 

/**httpsServer.listen(app.get('port'), function(){
  console.log('Stay in touch RESTful API server started on: ' + app.get('port'));
});
*/