var AWS = require('aws-sdk');
var Q = require('q');

exports.uploadToS3 = function(config, callback) {

    updateAwsConfig(config, AWS);

    var s3 = new AWS.S3();

    var files = [];

    Q.all(files.map(function(file) {
        return Q.nfcall(uploadFile, s3, config, file.name, file.contents, file.contentType);
    }))
    .then(function() {
        callback(null);
    })
    .catch(function(err) {
        callback(err);
    });
};

function updateAwsConfig(config, AWS) {

  if (config.awsAccessKeyId && config.awsSecretAccessKey) {
      AWS.config.update({
        accessKeyId: config.awsAccessKeyId,
        secretAccessKey: config.awsSecretAccessKey
      });
  }

  if (config.awsRegion) {
      AWS.config.update({
        region: config.awsRegion
      });
  }
}

function uploadFile(s3, config, fileName, contents, contentType, callback) {

    var params = {
        Bucket: config.awsBucketName,
        Key: fileName,
        Body: contents,
        ContentType: contentType
    };

    s3.upload(params, callback);
}
