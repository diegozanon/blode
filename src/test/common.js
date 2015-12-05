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
exports.filemapWriter = require('../lib/filemapWriter');
exports.prerenderer = require('../lib/prerenderer');
exports.S3uploader = require('../lib/S3uploader');
exports.postsData = require('./testData/postsData');
exports.partialsData = require('./testData/partialsData');

var fs = require('fs');
var path = require('path');

var config = {
    directory : path.join(__dirname, '../../example')
};

exports.config = config;

exports.readTwoFiles = function(file1, file2, callback) {

    fs.readFile(file1, 'utf8', function(err, contents1) {

        if(err)
            callback(err);

        fs.readFile(file2, 'utf8', function(err, contents2) {

            callback(err, [contents1, contents2]);
        });
    });
};
