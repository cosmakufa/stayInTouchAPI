// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-2'});
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;
// Create the IAM service object
var iam = new AWS.IAM({apiVersion: '2010-05-08'});

iam.listServerCertificates().eachPage(function(err, data) {
  if (err) {
    throw err;
  }
  if (data && data.ServerCertificateMetadataList) {
    data.ServerCertificateMetadataList.forEach(function(metadata) {
      console.log(metadata);
    });
  }
});