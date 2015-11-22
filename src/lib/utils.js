var Q = require('q');
var fs = require('fs');
var constants = require('./constants');

exports.mergeJSON = function(obj1, obj2) {

    var result = {};

    for(var key in obj1)
        result[key] = obj1[key];

    for(var key in obj2)
        result[key] = obj2[key];

    return result;
};

exports.getPosts = function(config, callback) {

    var path = config.directory + constants.FOLDER_RAW;

    /*Q.nfcall(fs.readdir, path)
        .then(function(files) {
            return Q.all(files.map(function(file) {
                return readDir(p.join(path, file));
            }))
            .then(function(results) {
                return [].concat.apply([], results);
            });
        })
        .then(function() {
            callback();
        });
    */

    /*fs.readdir(path, function(err, files) {
        if(err)
            callback(err);



    });*/
};