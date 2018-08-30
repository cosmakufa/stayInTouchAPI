// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.update({region: 'us-west-2', credentials: credentials});

// Create the acm service object
var acm = new AWS.ACM({apiVersion: '2015-12-08'});
var params = {
  CertificateArn: process.env.CertificateArn /* required */
};
acm.getCertificate(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});