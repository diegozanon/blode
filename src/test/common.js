exports.chai = require('chai');
exports.expect = exports.chai.expect;
exports.chai.use(require('chai-datetime'));
exports.constants = require('../lib/constants');
exports.utils = require('../lib/utils');
exports.initializer = require('../lib/initializer');
exports.markdowner = require('../lib/markdowner');
exports.postsListWriter = require('../lib/posts-list-writer');
exports.routesWriter = require('../lib/routes-writer');
exports.rssWriter = require('../lib/rss-writer');
exports.sitemapWriter = require('../lib/sitemap-writer');
exports.prerenderer = require('../lib/prerenderer');
exports.S3uploader = require('../lib/s3-uploader');
exports.sitemapData = require('./testData/sitemap-data');
exports.postsData = require('./testData/posts-data');
exports.partialsData = require('./testData/partials-data');
exports.postsHtmlData = require('./testData/posts-html-data');
exports.routesData = require('./testData/routes-data');
exports.rssData = require('./testData/rss-data');
exports.replaceTest = require('./testData/replace-test');

var fs = require('fs');
var path = require('path');
var Q = require('q');

var config = {
    directory : path.join(__dirname, '../../example')
};

exports.config = config;

var enconding = 'utf8';

exports.readOneFile = function(fileName, callback) {

    fs.readFile(fileName, enconding, function(err, contents) {

        if(err)
          callback(err);

        callback(err, contents);
    });
}

exports.readTwoFiles = function(file1, file2, callback) {

    fs.readFile(file1, enconding, function(err, contents1) {

        if(err)
          callback(err);

        fs.readFile(file2, enconding, function(err, contents2) {

            if(err)
              callback(err);

            callback(err, [contents1, contents2]);
        });
    });
}

exports.testWithPromises = function(promiseA, promiseB, test, done) {

  Q.all([promiseA, promiseB])
    .spread(function(resultA, resultB) {
        test(resultA, resultB);
    })
    .done(function() {
        done();
    });
}
