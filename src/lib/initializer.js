var constants = require('../lib/constants');

exports.validateInput = function() {
    var nbOfArgs = process.argv.length;

    if(nbOfArgs > 3) { // Usage: node app.js [directory]
        throw constants.MSG_ERROR_ARGS;
    }
};

exports.getDirectory = function() {

    var defaultDir = __dirname;
    var fixedDefaultDir = defaultDir.substr(0, defaultDir.lastIndexOf("\\")); // removing "\lib" from __dirname
    return process.argv[2] || fixedDefaultDir; // return fixedDefaultDir only if there is no thir argument
};