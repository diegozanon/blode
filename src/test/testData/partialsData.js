var common = require("../common");
var path = require('path');

exports.partials = function(callback) {

    var pathPartial1 = path.join(__dirname, './resources/partial1.html');
    var pathPartial2 = path.join(__dirname, './resources/partial2.html');

    common.readTwoFiles(pathPartial1, pathPartial2, function(err, expectedPartials) {

        if(err) callback(err);

        expectedPartials[0] = expectedPartials[0].replace(/[\r]/g, '');
        expectedPartials[1] = expectedPartials[1].replace(/[\r]/g, '');

        callback(null, expectedPartials);
    });
};
