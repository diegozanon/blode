var constants = require("./lib/constants");
var initializer = require("./lib/initializer");
var fs = require('fs');
var path = require('path');
var Q = require('q');
var express = require('express');
var opener = require('opener');
var serveStatic = require('serve-static');

exports.init = function() {

  var cmd = initializer.getCmd();

  switch (cmd.name) {

    case constants.ARG_NEW:
      createNew(cmd.arg);
      break;

    case constants.ARG_BUILD:
      build();
      break;

    case constants.ARG_RUN_LOCAL:
      runLocal();
      break;

    case constants.ARG_PUBLISH:
      publish();
      break;

    default:
      throw constants.MSG_ERROR_INVALID_ARGS;
  }
};

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

  checkIfFolderIsCorrect();

  // Create Promises
  var markdown = Q.denodeify(require("./lib/markdowner").markdown);
  var writePostsList = Q.denodeify(require("./lib/posts-list-writer").writePostsList);
  var writeRoutes = Q.denodeify(require("./lib/routes-writer").writeRoutes);
  var writeRss = Q.denodeify(require("./lib/rss-writer").writeRss);
  var writeSitemap = Q.denodeify(require("./lib/sitemap-writer").writeSitemap);
  var prerender = Q.denodeify(require("./lib/prerenderer").prerender);

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
    .then(function (posts) {
      console.log(constants.MSG_DEBUG_PRERENDER);
      return prerender(config, posts);
    })
    .catch(function (err) {
      console.error(err);
    })
    .done(function () {
      console.log(constants.MSG_DEBUG_FINISHED_BUILD);
    });
}

function runLocal() {

  checkIfFolderIsCorrect();

  var app = express();
  app.use(serveStatic('.'));
  app.listen(constants.RUN_LOCAL_PORT);

  console.log(constants.MSG_DEBUG_RUNNING_LOCAL);

  opener('http://localhost:' + constants.RUN_LOCAL_PORT);
}

function publish() {

  checkIfFolderIsCorrect();

  var uploader = require("./lib/s3-uploader");

  // Validate configuration
  var config = initializer.getConfig();
  config.directory = path.resolve(".");
  initializer.validate(config); // throws an error if invalid

  console.log(constants.MSG_DEBUG_UPLOADER);
  uploader.uploadToS3(config, function(err) {

    if (err)
      throw err;

    console.log(constants.MSG_DEBUG_FINISHED_PUBLISH);
  });
}

function checkIfFolderIsCorrect() {
  try {
    // check if index.html exist - if not, throws error
    // that's a fast check to verify if we are in the correct folder
    fs.accessSync(constants.FILE_NAME_HTML_INDEX, fs.F_OK);
  } catch (e) {
    throw constants.MSG_ERROR_INDEX_NOT_FOUND;
  }
}
