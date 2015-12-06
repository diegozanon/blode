var common = require("../common");
var path = require('path');

exports.partials = function(callback) {

    var partialPath1 = path.join(__dirname, './resources/partial1.html');
    var partialPath2 = path.join(__dirname, './resources/partial2.html');

    common.readTwoFiles(partialPath1, partialPath2, callback);
}
