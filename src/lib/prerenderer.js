var binPath = require('phantomjs').path;
var childProcess = require('child_process');
var path = require('path');
var Q = require('q');

exports.prerender = function(posts, callback) {

  var args = getArguments(posts);

  Q.all(args.map(function(arg) {
      return Q.nfcall(execPhantom, arg.pageName, arg.outputFile, arg.outputPath);
  }))
  .then(function() {
      callback(null);
  })
  .catch(function(err) {
      callback(err);
  });
};

function execPhantom(pageName, outputFile, outputPath, callback) {

  var childArgs = [
    path.join(__dirname, 'phantomjs-script.js'),
    pageName,
    outputFile,
    outputPath
  ];

  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    callback(err);
  });
}

function getArguments(posts) {

  var args = [];

  posts.forEach(function(post) {

    var arg = {
      pageName: 'http://localhost/posts/' + post.url,
      outputFile: post.url,
      outputPath: 'postsx'
    }

    args.push(arg);
  });

  return args;
}
