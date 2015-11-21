var Q = require('q');
var constants = require("./lib/constants");
var initializer = require("./lib/initializer");
var markdowner = require("./lib/markdowner");
var postsIndexWriter = require("./lib/postsIndexWriter");
var routesWriter = require("./lib/routesWriter");
var rssWriter = require("./lib/rssWriter");
var filemapWriter = require("./lib/filemapWriter");
var prerenderer = require("./lib/prerenderer");
var S3uploader = require("./lib/S3uploader");

var markdown = Q.denodeify(markdowner.markdown);
var writePostsIndex = Q.denodeify(postsIndexWriter.writePostsIndex);
var writeRoutes = Q.denodeify(routesWriter.writeRoutes);
var writeRss = Q.denodeify(rssWriter.writeRss);
var writeFilemap = Q.denodeify(filemapWriter.writeFilemap);
var prerender = Q.denodeify(prerenderer.prerender);
var uploadToS3 = Q.denodeify(S3uploader.uploadToS3);

function main() {

    var config = initializer.getConfig();
    initializer.validate(config); // throws an error if invalid

    console.log(constants.MSG_DEBUG_START);

    markdown()
        .then(function () {
            return writePostsIndex();
        })
        .then(function () {
            return writeRoutes();
        })
        .then(function () {
            return writeRss();
        })
        .then(function () {
            return writeFilemap();
        })
        .then(function () {
            return prerender();
        })
        .then(function () {
            return uploadToS3();
        })
        .done(function () {
            console.log(constants.MSG_DEBUG_FINISH);
        });
}

main();