var common = require("../common");
var path = require('path');

exports.getPath = function() {

    return path.join(__dirname, './resources/replace-test.txt');
}
