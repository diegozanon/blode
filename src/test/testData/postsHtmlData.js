var common = require("../common");
var path = require('path');

exports.postsHtml = function(callback) {

    var pathPosts = path.join(__dirname, './resources/posts.html');

    common.readOneFile(pathPosts, callback);
};
