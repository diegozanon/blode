var common = require("../common");
var path = require('path');

exports.postsHtml = function(callback) {

    var postsPath = path.join(__dirname, './resources/posts.html');

    common.readOneFile(postsPath, callback);
};
