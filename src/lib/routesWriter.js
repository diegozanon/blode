var constants = require('./constants');
var fs = require('fs');
var utils = require('./utils');

exports.writeRoutes = function(config, posts, callback) {

  var routesTemplate = config.directory + constants.FILE_JS_ROUTES_TEMPLATE;
  var routesPath = config.directory + constants.FILE_JS_ROUTES;

  var postsReversed = posts.slice(); // create another copy
  postsReversed.reverse(); //routes.js lists posts in reverse order

  var routes = '';
  postsReversed.forEach(function(post) {

    var isoDate = utils.extractIsoDate(post.date);
    var line1 = "      .when('/posts/{0}', {".replace('{0}', post.url);
    var line2 = "        templateUrl: '/partials/{0}-{1}.html'".replace('{0}', isoDate).replace('{1}', post.url);
    var line3 = "      })";

    routes += line1 + '\n' + line2 + '\n' + line3 + '\n';
  });

  fs.readFile(routesTemplate, 'utf8', function(err, contents) {

      if(err)
        callback(err);

      contents = contents.replace('{{posts}}', routes);

      fs.writeFile(routesPath, contents, function(err) {
          callback(err, posts);
      });
  });
};
