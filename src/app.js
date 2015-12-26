var Q = require('q');
var constants = require("./lib/constants");
var initializer = require("./lib/initializer");

// Create Promises
var markdown = Q.denodeify(require("./lib/markdowner").markdown);
var writePostsList = Q.denodeify(require("./lib/posts-list-writer").writePostsList);
var writeRoutes = Q.denodeify(require("./lib/routes-writer").writeRoutes);
var writeRss = Q.denodeify(require("./lib/rss-writer").writeRss);
var writeSitemap = Q.denodeify(require("./lib/sitemap-writer").writeSitemap);
var prerender = Q.denodeify(require("./lib/prerenderer").prerender);
var uploadToS3 = Q.denodeify(require("./lib/s3-uploader").uploadToS3);

// Validate configuration
var config = initializer.getConfig();
initializer.validate(config); // throws an error if invalid

console.log(constants.MSG_DEBUG_START);
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
  .then(function () {
    console.log(constants.MSG_DEBUG_UPLOADER);
    return uploadToS3();
  })
  .catch(function (err) {
    console.error(err);
  })
  .done(function () {
    console.log(constants.MSG_DEBUG_FINISH);
  });
