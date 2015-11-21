var Q = require('q');
var initializer = require("./lib/initializer");
var constants = require("./lib/constants");
var markdowner = require("./lib/markdowner");
var prerenderer = require("./lib/prerenderer");
var S3uploader = require("./lib/S3uploader");

var markdown = Q.denodeify(markdowner.markdown);
var prerender = Q.denodeify(prerenderer.prerender);
var upload = Q.denodeify(S3uploader.upload);

function main() {

    var config = initializer.getConfig();
    initializer.validate(config); // throws an error if invalid

    console.log(constants.MSG_DEBUG_START);

    markdown()
        .then(function () {
            return prerender();
        })
        .then(function () {
            return upload();
        })
        .done(function () {
            console.log(constants.MSG_DEBUG_FINISH);
        });
}

main();