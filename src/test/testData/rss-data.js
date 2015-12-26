var common = require("../common");
var path = require('path');

exports.rss = function(callback) {

    var rssPath = path.join(__dirname, './resources/feed.xml');

    common.readOneFile(rssPath, callback);
}
