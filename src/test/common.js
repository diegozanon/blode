var chai = require('chai');
var expect = chai.expect;
var chaiDatetime = require('chai-datetime');
var path = require('path');
var constants = require('../lib/constants');
var utils = require('../lib/utils');
var initializer = require('../lib/initializer');
var markdowner = require('../lib/markdowner');
var postsListWriter = require('../lib/postsListWriter');
var routesWriter = require('../lib/routesWriter');
var rssWriter = require('../lib/rssWriter');
var filemapWriter = require('../lib/filemapWriter');
var prerenderer = require('../lib/prerenderer');
var S3uploader = require('../lib/S3uploader');
var postsData = require('./testData/postsData');

chai.use(chaiDatetime);

exports.chai = chai;
exports.expect = expect;
exports.constants = constants;
exports.utils = utils;
exports.initializer = initializer;
exports.markdowner = markdowner;
exports.postsListWriter = postsListWriter;
exports.routesWriter = routesWriter;
exports.rssWriter = rssWriter;
exports.filemapWriter = filemapWriter;
exports.prerenderer = prerenderer;
exports.S3uploader = S3uploader;
exports.postsData = postsData;

var config = {
    directory : path.join(__dirname, '../../example')
};

exports.config = config;

