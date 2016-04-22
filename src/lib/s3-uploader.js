var constants = require('./constants');
var utils = require('./utils');
var AWS = require('aws-sdk');
var fs = require('fs');
var Q = require('q');

exports.uploadToS3 = function(config, uploadPrerendered, callback) {

    utils.getPosts(config, function(err, posts) {

        if(err)
            callback(err);

        updateAwsConfig(config, AWS);

        var s3 = new AWS.S3();

        getFilesToUpload(config, posts, uploadPrerendered, function(err, files) {

            if (err)
                callback(err);

            Q.all(files.map(function(file) {
                return Q.nfcall(uploadFile, s3, config, file);
            }))
            .then(function() {
                callback(null, posts);
            })
            .catch(function(err) {
                callback(err);
            });
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

function getFilesToUpload(config, posts, uploadPrerendered, callback) {

    var files = [];

    if (uploadPrerendered) {

      /* Prerendered files */
      posts.forEach(function(post) {
          files.push({
              Key: constants.FOLDER_AWS_POSTS + post.url,
              Body: fs.readFileSync(config.directory + constants.FOLDER_POSTS + '\\' + post.url),
              ContentType: constants.CONTENT_TYPE_HTML
          });
      });

      callback(null, files);
    }

    /* Root files */

    files.push({
        Key: constants.FILE_NAME_HTML_INDEX,
        Body: fs.readFileSync(config.directory + constants.FILE_HTML_INDEX_PRERENDERED),
        ContentType: constants.CONTENT_TYPE_HTML
    });

    files.push({
        Key: constants.FILE_NAME_PRERENDERED_404,
        Body: fs.readFileSync(config.directory + constants.FILE_HTML_404_PRERENDERED),
        ContentType: constants.CONTENT_TYPE_HTML
    });

    files.push({
        Key: constants.FILE_NAME_ICO_FAVICON,
        Body: fs.readFileSync(config.directory + constants.FILE_ICO_FAVICON),
        ContentType: constants.CONTENT_TYPE_ICO
    });

    files.push({
        Key: constants.FILE_NAME_XML_RSS,
        Body: fs.readFileSync(config.directory + constants.FILE_XML_RSS),
        ContentType: constants.CONTENT_TYPE_XML
    });

    files.push({
        Key: constants.FILE_NAME_XML_SITEMAP,
        Body: fs.readFileSync(config.directory + constants.FILE_XML_SITEMAP),
        ContentType: constants.CONTENT_TYPE_XML
    });

    /* Partials files */

    posts.forEach(function(post) {

        var partialName = post.isoDate + '-' + post.url + '.html';

        files.push({
            Key: constants.FOLDER_AWS_PARTIALS + partialName,
            Body: fs.readFileSync(config.directory + constants.FOLDER_PARTIALS + '\\' + partialName),
            ContentType: constants.CONTENT_TYPE_HTML
        });
    });

    /* Remaining partials */

    files.push({
        Key: constants.FOLDER_AWS_PARTIALS + constants.FILE_NAME_HTML_404,
        Body: fs.readFileSync(config.directory + constants.FILE_HTML_404),
        ContentType: constants.CONTENT_TYPE_HTML
    });

    files.push({
        Key: constants.FOLDER_AWS_PARTIALS + constants.FILE_NAME_HTML_POSTS,
        Body: fs.readFileSync(config.directory + constants.FILE_HTML_POSTS),
        ContentType: constants.CONTENT_TYPE_HTML
    });

    /* JavaScript files */

    files.push({
        Key: constants.FOLDER_AWS_JS + constants.FILE_NAME_JS_APP,
        Body: fs.readFileSync(config.directory + constants.FILE_JS_APP),
        ContentType: constants.CONTENT_TYPE_JS
    });

    files.push({
        Key: constants.FOLDER_AWS_JS + constants.FILE_NAME_JS_CONTROLLERS,
        Body: fs.readFileSync(config.directory + constants.FILE_JS_CONTROLLERS),
        ContentType: constants.CONTENT_TYPE_JS
    });

    files.push({
        Key: constants.FOLDER_AWS_JS + constants.FILE_NAME_JS_DIRECTIVES,
        Body: fs.readFileSync(config.directory + constants.FILE_JS_DIRECTIVES),
        ContentType: constants.CONTENT_TYPE_JS
    });

    files.push({
        Key: constants.FOLDER_AWS_JS + constants.FILE_NAME_JS_NGCLOAK,
        Body: fs.readFileSync(config.directory + constants.FILE_JS_NGCLOAK),
        ContentType: constants.CONTENT_TYPE_JS
    });

    files.push({
        Key: constants.FOLDER_AWS_JS + constants.FILE_NAME_JS_ROUTES,
        Body: fs.readFileSync(config.directory + constants.FILE_JS_ROUTES),
        ContentType: constants.CONTENT_TYPE_JS
    });

    /* CSS files */

    files.push({
        Key: constants.FOLDER_AWS_CSS + constants.FILE_NAME_CSS_SITE,
        Body: fs.readFileSync(config.directory + constants.FILE_CSS_SITE),
        ContentType: constants.CONTENT_TYPE_CSS
    });

    /* Image files */

    getImagesToUpload(config, function(err, images) {

        if(err)
            callback(err);

        files = files.concat(images);

        /* JavaScript assets */

        getJsAssetsToUpload(config, function(err, assets) {

            if(err)
                callback(err);

            files = files.concat(assets);

            callback(null, files);
        });
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

function getJsAssetsToUpload(config, callback) {

    var awsFolderAssets = constants.FOLDER_AWS_JS_ASSETS;
    var contentType = constants.CONTENT_TYPE_JS;
    var assetsDir = config.directory + constants.FOLDER_JS_ASSETS;
    var assets = [];

    getFilesToUploadInDirectory(assetsDir, awsFolderAssets, contentType, function(err, files) {

        if (err)
            callback(err);

        assets = assets.concat(files);

        callback(null, assets);
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
                        Key: awsFolder + file,
                        Body: fs.readFileSync(path),
                        ContentType: contentType
                    });
                }
            });
        }

        callback(null, filesToUpload);
    });
}

function uploadFile(s3, config, params, callback) {

    params.Bucket = config.awsBucketName;
    params.ACL = constants.AWS_ACL;

    s3.upload(params, callback);
}
