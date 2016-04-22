var constants = require("./lib/constants");
var initializer = require("./lib/initializer");
var path = require('path');
var Q = require('q');

exports.init = function() {

  var cmd = initializer.getCmd();

  switch (cmd.name) {

    case constants.ARG_NEW:
      createNew(cmd.arg);
      break;

    case constants.ARG_BUILD:
      build();
      break;

    case constants.ARG_DEPLOY:
      deploy();
      break;

    default:
      throw constants.MSG_ERROR_INVALID_ARGS;
  }
};

exports.init();

function createNew(name) {

  require("./lib/sample-creator").create(name, function(err) {

    if (err) {
      console.error(err);
    } else {
      console.log(constants.MSG_DEBUG_FINISHED_CREATING);
    }
  });
}

function build() {

  // Create Promises
  var markdown = Q.denodeify(require("./lib/markdowner").markdown);
  var writePostsList = Q.denodeify(require("./lib/posts-list-writer").writePostsList);
  var writeRoutes = Q.denodeify(require("./lib/routes-writer").writeRoutes);
  var writeRss = Q.denodeify(require("./lib/rss-writer").writeRss);
  var writeSitemap = Q.denodeify(require("./lib/sitemap-writer").writeSitemap);

  var config = {
    directory: path.resolve(".")
  }

  console.log(constants.MSG_DEBUG_MARKDOWNER);
  markdown(config)
    .then(function (posts) {
      console.log(constants.MSG_DEBUG_POSTSLIST);
      return writePostsList(config, posts);
    })
    .then(function (posts) {
      console.log(constants.MSG_DEBUG_ROUTES);
      return writeRoutes(config, posts);
    })
    .then(function (posts) {
      console.log(constants.MSG_DEBUG_RSS);
      return writeRss(config, posts);
    })
    .then(function (posts) {
      console.log(constants.MSG_DEBUG_SITEMAP);
      return writeSitemap(config, posts);
    })
    .catch(function (err) {
      console.error(err);
    })
    .done(function () {
      console.log(constants.MSG_DEBUG_FINISHED_BUILD);
    });
}

function deploy() {

  // Create Promises
  var uploadToS3 = Q.denodeify(require("./lib/s3-uploader").uploadToS3);
  var prerender = Q.denodeify(require("./lib/prerenderer").prerender);

  // Validate configuration
  var config = initializer.getConfig();
  config.directory = path.resolve(".");
  initializer.validate(config); // throws an error if invalid

  console.log(constants.MSG_DEBUG_START_DEPLOY);
  console.log(constants.MSG_DEBUG_UPLOADER);
  var uploadPrerendered = false;
  uploadToS3(config, uploadPrerendered)
    .then(function (posts) {
      console.log(constants.MSG_DEBUG_PRERENDER);
      return prerender(config, posts);
    })
    .then(function (posts) {
      console.log(constants.MSG_DEBUG_UPLOADER_PRERENDERED);
      uploadPrerendered = true;
      return uploadToS3(config, uploadPrerendered);
    })
    .catch(function (err) {
      console.error(err);
    })
    .done(function () {
      console.log(constants.MSG_DEBUG_FINISHED_DEPLOY);
    });
}
