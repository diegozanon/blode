exports.chai = require('chai');
exports.expect = exports.chai.expect;
exports.chai.use(require('chai-datetime'));
exports.constants = require('../lib/constants');
exports.utils = require('../lib/utils');
exports.initializer = require('../lib/initializer');
exports.markdowner = require('../lib/markdowner');
exports.postsListWriter = require('../lib/postsListWriter');
exports.routesWriter = require('../lib/routesWriter');
exports.rssWriter = require('../lib/rssWriter');
exports.sitemapWriter = require('../lib/sitemapWriter');
exports.prerenderer = require('../lib/prerenderer');
exports.S3uploader = require('../lib/S3uploader');
exports.sitemapData = require('./testData/sitemapData');
exports.postsData = require('./testData/postsData');
exports.partialsData = require('./testData/partialsData');
exports.postsHtmlData = require('./testData/postsHtmlData');
exports.routesData = require('./testData/routesData');
exports.rssData = require('./testData/rssData');

var fs = require('fs');
var path = require('path');

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
