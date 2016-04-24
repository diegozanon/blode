var constants = require('./constants');
var utils = require('./utils');
var fs = require('fs');
var path = require('path');
var Q = require('q');

exports.prerender = function(config, posts, callback) {

  var pages = getPages(config, posts);
  var indexPath = path.join(config.directory, constants.FILE_NAME_HTML_INDEX);
  var indexContents = fs.readFileSync(indexPath);

  Q.all(pages.map(function(page) {
      return Q.nfcall(prerenderPage, page, indexContents);
  }))
  .then(function() {
      callback(null);
  })
  .catch(function(err) {
      callback(err);
  });
};

function getPages(config, posts) {

  var pages = [];
  var dir = config.directory;

  posts.forEach(function(post) {

    var isoDate = utils.extractIsoDate(post.date);
    var partialName = isoDate + '-' + post.url + '.html';

    pages.push({ // post
      contentPath: path.join(dir, constants.FOLDER_PARTIALS, partialName),
      outputPath: path.join(dir, constants.FOLDER_POSTS, post.url)
    });
  });

  pages.push({ // index
    contentPath: path.join(dir, constants.FOLDER_PARTIALS, constants.FILE_NAME_HTML_POSTS),
    outputPath: path.join(dir, constants.FOLDER_PRERENDERED, constants.FILE_NAME_HTML_INDEX)
  });

  pages.push({ // notFound
    contentPath: path.join(dir, constants.FOLDER_PARTIALS, constants.FILE_NAME_HTML_404),
    outputPath: path.join(dir, constants.FOLDER_PRERENDERED, constants.FILE_NAME_PRERENDERED_404)
  });

  return pages;
}

function prerenderPage(page, indexContents, callback) {

  var fileName = page.outputPath;

  // save page with index.html content
  fs.writeFile(fileName, indexContents, function(err) {

    var original = constants.REPLACE_NGVIEW_REPLACE_SPOT;
    var replacement = fs.readFileSync(page.contentPath).toString();

    utils.replaceFileContent(fileName, original, replacement, callback);
  });
}
