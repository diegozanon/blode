var constants = require('./constants');
var utils = require('./utils');
var binPath = require('phantomjs').path;
var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');
var Q = require('q');

exports.prerender = function(config, posts, callback) {

  var args = getArguments(config, posts);

  // Create Promises
  var removePreviousPostsP = Q.denodeify(removePreviousPosts);
  var hideNgCloakFileP = Q.denodeify(hideNgCloakFile);
  var prerenderPagesP = Q.denodeify(prerenderPages);
  var removeNgCloakClassP = Q.denodeify(removeNgCloakClass);
  var showNgCloakFileP = Q.denodeify(showNgCloakFile);

  removePreviousPostsP(config)
    .then(function () {
      return hideNgCloakFileP(config);
    })
    .then(function () {
      return prerenderPagesP(args);
    })
    .then(function () {
      return removeNgCloakClassP(config, posts);
    })
    .then(function () {
      return showNgCloakFileP(config);
    })
    .catch(function (err) {
      callback(err);
    })
    .done(function () {
      callback();
    });
};

function prerenderPages(args, callback) {
  Q.all(args.map(function(arg) {
      return Q.nfcall(execPhantom, arg.pageName, arg.outputFile, arg.outputPath);
  }))
  .then(function() {
      callback(null);
  })
  .catch(function(err) {
      callback(err);
  });
}

function execPhantom(pageName, outputFile, outputPath, callback) {

  var childArgs = [
    path.join(__dirname, constants.PHANTOMJS_SCRIPT),
    pageName,
    outputFile,
    outputPath
  ];

  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    console.log(stdout);
    callback(err);
  });
}

function getArguments(config, posts) {

  var args = [];

  posts.forEach(function(post) {

    var arg = {
      pageName: constants.STAGING_HOSTED_URL + '/' +  constants.FOLDER_POSTS.replace('\\', '') + '/' + post.url,
      outputFile: post.url,
      outputPath: config.directory + constants.FOLDER_POSTS
    };

    args.push(arg);
  });

  var index = {
    pageName: constants.STAGING_HOSTED_URL,
    outputFile: 'index.html',
    outputPath: config.directory + constants.FOLDER_PRERENDERED
  };

  args.push(index);

  var notFound = {
    pageName: constants.STAGING_HOSTED_URL + '/' + 'page-that-does-not-exist',
    outputFile: '404',
    outputPath: config.directory + constants.FOLDER_PRERENDERED
  };

  args.push(notFound);

  return args;
}

// This is needed. Otherwise, phanthomjs will see the old version of the file instead of the new content
function removePreviousPosts(config, callback) {

  var dir = config.directory + constants.FOLDER_POSTS;

  fs.readdir(dir, function(err, files) {

    if (err)
      callback(err);

    Q.all(files.map(function(file) {

      var path = dir + '\\' + file;
      return Q.nfcall(fs.unlink, path);
    }))
    .then(function() {
      callback(null);
    })
    .catch(function(err) {
      callback(err);
    });
  });
}

function hideNgCloakFile(config, callback) {

  var indexFile = config.directory + constants.FILE_HTML_INDEX;
  var original = constants.REPLACE_NGCLOAK_FILE;
  var replacement = constants.REPLACE_NGCLOAK_FILE_REPLACEMENT;

  utils.replaceFileContent(indexFile, original, replacement, callback);
}

function showNgCloakFile(config, callback) {

  var indexFile = config.directory + constants.FILE_HTML_INDEX;
  var original = constants.REPLACE_NGCLOAK_FILE;
  var replacement = constants.REPLACE_NGCLOAK_FILE_REPLACEMENT;

  // invert original with replacement to recover the previous file
  utils.replaceFileContent(indexFile, replacement, original, callback);
}

function removeNgCloakClass(config, posts, callback) {
  callback();
}
