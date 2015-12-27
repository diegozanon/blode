var constants = require('./constants');
var AWS = require('aws-sdk');
var fs = require('fs');
var Q = require('q');

exports.uploadToS3 = function(config, posts, callback) {

    updateAwsConfig(config, AWS);

    var s3 = new AWS.S3();

    getFilesToUpload(config, posts, function(err, files) {

        if (err)
            callback(err);

        Q.all(files.map(function(file) {
            return Q.nfcall(uploadFile, s3, config, file.name, file.contents, file.contentType);
        }))
        .then(function() {
            callback(null);
        })
        .catch(function(err) {
            callback(err);
        });
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

function getFilesToUpload(config, posts, callback) {

    var files = [];

    /* Root files */

    files.push({
        name: constants.FILE_NAME_HTML_INDEX,
        contents: readFileSync(config.directory + constants.FILE_HTML_INDEX_PRERENDERED),
        contentType: constants.CONTENT_TYPE_HTML
    });

    files.push({
        name: constants.FILE_NAME_PRERENDERED_404,
        contents: readFileSync(config.directory + constants.FILE_HTML_404_PRERENDERED),
        contentType: constants.CONTENT_TYPE_HTML
    });

    files.push({
        name: constants.FILE_NAME_ICO_FAVICON,
        contents: readFileSync(config.directory + constants.FILE_ICO_FAVICON),
        contentType: constants.CONTENT_TYPE_ICO
    });

    files.push({
        name: constants.FILE_NAME_XML_RSS,
        contents: readFileSync(config.directory + constants.FILE_XML_RSS),
        contentType: constants.CONTENT_TYPE_XML
    });

    files.push({
        name: constants.FILE_NAME_XML_SITEMAP,
        contents: readFileSync(config.directory + constants.FILE_XML_SITEMAP),
        contentType: constants.CONTENT_TYPE_XML
    });

    /* Partials and Posts files */

    posts.forEach(function(post) {

        files.push({
            name: constants.FOLDER_AWS_POSTS + post.url,
            contents: readFileSync(config.directory + constants.FOLDER_POSTS + '\\' + post.url),
            contentType: constants.CONTENT_TYPE_HTML
        });

        files.push({
            name: constants.FOLDER_AWS_PARTIALS + post.isoDate + '-' + post.url + '.html',
            contents: readFileSync(config.directory + constants.FOLDER_POSTS + '\\' + post.url),
            contentType: constants.CONTENT_TYPE_HTML
        });
    });

    /* Remaining partials */

    files.push({
        name: constants.FOLDER_AWS_PARTIALS + constants.FILE_NAME_HTML_404,
        contents: readFileSync(config.directory + constants.FILE_HTML_404),
        contentType: constants.CONTENT_TYPE_HTML
    });

    files.push({
        name: constants.FOLDER_AWS_PARTIALS + constants.FILE_NAME_HTML_POSTS,
        contents: readFileSync(config.directory + constants.FILE_HTML_POSTS),
        contentType: constants.CONTENT_TYPE_HTML
    });

    /* JavaScript files */

    files.push({
        name: constants.FOLDER_AWS_JS + constants.FILE_NAME_JS_APP,
        contents: readFileSync(config.directory + constants.FILE_JS_APP),
        contentType: constants.CONTENT_TYPE_JS
    });

    files.push({
        name: constants.FOLDER_AWS_JS + constants.FILE_NAME_JS_CONTROLLERS,
        contents: readFileSync(config.directory + constants.FILE_JS_CONTROLLERS),
        contentType: constants.CONTENT_TYPE_JS
    });

    files.push({
        name: constants.FOLDER_AWS_JS + constants.FILE_NAME_JS_DIRECTIVES,
        contents: readFileSync(config.directory + constants.FILE_JS_DIRECTIVES),
        contentType: constants.CONTENT_TYPE_JS
    });

    files.push({
        name: constants.FOLDER_AWS_JS + constants.FILE_NAME_JS_NGCLOAK,
        contents: readFileSync(config.directory + constants.FILE_JS_NGCLOAK),
        contentType: constants.CONTENT_TYPE_JS
    });

    files.push({
        name: constants.FOLDER_AWS_JS + constants.FILE_NAME_JS_ROUTES,
        contents: readFileSync(config.directory + constants.FILE_JS_ROUTES),
        contentType: constants.CONTENT_TYPE_JS
    });

    /* CSS files */

    files.push({
        name: constants.FOLDER_AWS_CSS + constants.FILE_NAME_CSS_SITE,
        contents: readFileSync(config.directory + constants.FILE_CSS_SITE),
        contentType: constants.CONTENT_TYPE_CSS
    });

    /* Image files */

    getImagesToUpload(config, function(err, images) {

        if(err)
            callback(err);

        files = files.concat(images);

        callback(null, files);
    });
}

function getImagesToUpload(config, callback) {

    var awsFolderImages = constants.FOLDER_AWS_IMAGES;
    var awsFolderImagesPosts = constants.FOLDER_AWS_IMAGES_POSTS;
    var contentType = constants.CONTENT_TYPE_PNG;
    var imagesDir = config.directory + constants.FOLDER_IMAGES;
    var imagesPostsDir = config.directory + constants.FOLDER_IMAGES_POSTS;
    var images = [];

    getFilesToUploadInDirectory(imagesDir, awsFolderImages, contentType, function(err, files1) {

        if (err)
            callback(err);

        images = images.concat(files1);

        getFilesToUploadInDirectory(imagesPostsDir, awsFolderImagesPosts, contentType, function(err, files2) {

            if (err)
                callback(err);

            images = images.concat(files2);
            callback(null, images);
        });
    });
}

function getFilesToUploadInDirectory(directory, awsFolder, contentType, callback) {

    var filesToUpload = [];

    fs.readdir(directory, function(err, files) {

        if (err)
            callback(null, filesToUpload); // empty directory

        if (files) {
            files.forEach(function(file) {
                var path = directory + '\\' + file;
                if (!fs.lstatSync(path).isDirectory()) {
                    filesToUpload.push({
                        name: awsFolder + file,
                        contents: readFileSync(path),
                        contentType: contentType
                    });
                }
            });
        }

        callback(null, filesToUpload);
    });
}

function uploadFile(s3, config, fileName, contents, contentType, callback) {

    var params = {
        Bucket: config.awsBucketName,
        Key: fileName,
        Body: contents,
        ContentType: contentType
    };

    s3.putObject(params, callback);

    s3.putObject(params, function(err, data) {
            if (err) {
                console.log('Error putting object on S3: ' + err);
            } else {
                console.log('Placed object on S3: ' + data);
            }
        });
}

function readFileSync(path) {
    return fs.readFileSync(path, 'utf8');
}
