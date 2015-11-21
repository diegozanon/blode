var Q = require('q');
var constants = require("./lib/constants");
var initializer = require("./lib/initializer");
var markdowner = require("./lib/markdowner");
var postsListWriter = require("./lib/postsListWriter");
var routesWriter = require("./lib/routesWriter");
var rssWriter = require("./lib/rssWriter");
var filemapWriter = require("./lib/filemapWriter");
var prerenderer = require("./lib/prerenderer");
var S3uploader = require("./lib/S3uploader");

var markdown = Q.denodeify(markdowner.markdown);
var writePostsList = Q.denodeify(postsListWriter.writePostsList);
var writeRoutes = Q.denodeify(routesWriter.writeRoutes);
var writeRss = Q.denodeify(rssWriter.writeRss);
var writeFilemap = Q.denodeify(filemapWriter.writeFilemap);
var prerender = Q.denodeify(prerenderer.prerender);
var uploadToS3 = Q.denodeify(S3uploader.uploadToS3);

function main() {

    var config = initializer.getConfig();
    initializer.validate(config); // throws an error if invalid

    console.log(constants.MSG_DEBUG_START);

    console.log(constants.MSG_DEBUG_MARKDOWNER);
    markdown(config)
        .then(function () {
            console.log(constants.MSG_DEBUG_POSTSLIST);
            return writePostsList();
        })
        .then(function () {
            console.log(constants.MSG_DEBUG_ROUTES);
            return writeRoutes();
        })
        .then(function () {
            console.log(constants.MSG_DEBUG_RSS);
            return writeRss();
        })
        .then(function () {
            console.log(constants.MSG_DEBUG_FILEMAP);
            return writeFilemap();
        })
        .then(function () {
            console.log(constants.MSG_DEBUG_PRERENDER);
            return prerender();
        })
        .then(function () {
            console.log(constants.MSG_DEBUG_UPLOADER);
            return uploadToS3();
        })
        .done(function () {
            console.log(constants.MSG_DEBUG_FINISH);
        });
}

main();