var common = require("../common");
var path = require('path');

exports.routes = function(callback) {

    // had to use routes.txt instead of routes.js
    // because Node was trying to compile the Angular module
    var routesPath = path.join(__dirname, './resources/routes.txt');

    common.readOneFile(routesPath, callback);
};
