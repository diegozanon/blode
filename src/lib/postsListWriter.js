var constants = require('./constants');
var utils = require('./utils');

exports.writePostsList = function(config, posts, callback) {

  var jadeTemplate = config.directory + constants.FILE_JADE_POSTLIST;
  var postsPath = config.directory + constants.FILE_HTML_POSTS;

  posts.reverse(); // posts.htmls lists posts in reverse order

  posts.forEach(function(post) {
      post.showTags = '';
      post.filters = [];
      post.tags.split(',').forEach(function(tag) {
          post.showTags += ' || active.' + tag.trim().toLowerCase();
          post.filters.push(tag.trim());
      });
  });

  var file = [{
      locals: { posts: posts },
      name: postsPath
  }];

  utils.renderWithJade(file, jadeTemplate, function(err) {
      callback(err, posts);
  });
};
