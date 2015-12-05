var fs = require('fs');
var jade = require('jade');
var moment = require('moment');
var path = require('path');
var Q = require('q');
var constants = require('./constants');

exports.mergeJSON = function(obj1, obj2) {

    var result = {};

    for(var key in obj1)
        result[key] = obj1[key];

    for(var key in obj2)
        result[key] = obj2[key];

    return result;
}

exports.getPosts = function(config, callback) {

    var rawDir = config.directory + constants.FOLDER_RAW;

    Q.nfcall(fs.readdir, rawDir)
    .then(function(files) {

        return Q.all(files.map(function(file) {
            var fullPath = rawDir + '\\' + file;
            return Q.nfcall(fs.readFile, fullPath, 'utf8')
                .then(function(fileContents) {
                    return extractPostData(file, fileContents);
                })
        }))
    })
    .then(function(results) {
        callback(null, results);
    })
    .catch(function (err) {
        callback(err);
    });
}

exports.extractDate = function(dateStr) {

    // Format e.g.: Nov 08, 2015
    var dateConverted = moment(dateStr, 'MMM DD, YYYY').format().toString();

    // Remove timezone and return
    return dateConverted.substring(0, 10);
};

exports.renderWithJade = function(files, jadeTemplate, callback) {

    Q.all(files.map(function(file) {

        var jadeArgs = exports.mergeJSON(constants.JADE_OPTIONS, file.locals);

        return Q.nfcall(jade.renderFile, jadeTemplate, jadeArgs)
            .then(function(html) {
                return Q.nfcall(fs.writeFile, file.name, html)
            });
    }))
    .then(function() {
        callback(null);
    })
    .catch(function(err) {
        callback(err);
    });
}

function extractPostData(fileName, fileContents) {

    var lines = fileContents.toString().split('\n');

    if(lines.length < 6)
        throw constants.MSG_ERROR_INVALID_RAW.replace('{0}', fileName);

    var content = '';
    for (var i = 5; i < lines.length; i++) {
        content += lines[i];
    }

    var postData = {
        title : lines[0].replace('Title:', '').trim(),
        summary : lines[1].replace('Summary:', '').trim(),
        tags : lines[2].replace('Tags:', '').trim(),
        date : lines[3].replace('Date:', '').trim(),
        url : lines[4].replace('URL:', '').trim(),
        content : content.replace(/[\r\n]/g, '\n').trim()
    };

    return postData;
}
