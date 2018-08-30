var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  Users = require('./api/models/users.js'), //created model loading here
  People = require('./api/models/people.js'),
  Encounters = require('./api/models/encounters.js'),
  bodyParser = require('body-parser'),
  https = require('https'),
  fs = require('fs'),
  stylus = require('stylus'),
  nib = require('nib'),
  logger = require('morgan');


app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))



//////////////////////////////////AWS SETUP ////////////////////////////////////////////////////////////////
// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-2'});
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

//////////////////////////////////MONGOOSE SETUP  ////////////////////////////////////////////////////////////////
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



////////////////////////////////////////ROUTES ////////////////////////////////////////////////////////////////
var routes = require('./api/routes/routes.js'); //importing route
routes(app); //register the route
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

////////////////////////////SETTING UP SERVER////////////////////////////////////////////////////////////////
/*var options = {
  key: fs.readFileSync(__dirname +'/credentials/api.pem'),
  cert: fs.readFileSync(__dirname +'/credentials/api.crt')
};
 
var httpsServer = https.createServer(options, app);
 */
//app.listen(port);/
/**httpsServer.listen(app.get('port'), function(){
  console.log('Stay in touch RESTful API server started on: ' + app.get('port'));
});*/
app.listen(app.get('port'), function(){
  console.log('Stay in touch RESTful API server started on: ' + app.get('port'));
});
