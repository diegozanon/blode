var common = require("../common");
var path = require('path');

exports.sitemap = function(callback) {

    var sitemapPath = path.join(__dirname, './resources/sitemap.xml');

    common.readOneFile(sitemapPath, callback);
};
