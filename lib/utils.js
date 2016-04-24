var fs = require('fs');
var jade = require('jade');
var moment = require('moment');
var path = require('path');
var Q = require('q');
var constants = require('./constants');

exports.mergeJSON = function(obj1, obj2) {

    var result = {};

    for(var key1 in obj1)
        result[key1] = obj1[key1];

    for(var key2 in obj2)
        result[key2] = obj2[key2];

    return result;
};

exports.getPosts = function(config, callback) {

    var rawDir = path.join(config.directory, constants.FOLDER_RAW);

    Q.nfcall(fs.readdir, rawDir)
    .then(function(files) {

        return Q.all(files.map(function(file) {
            var fullPath = rawDir + '\\' + file;
            return Q.nfcall(fs.readFile, fullPath, 'utf8')
                .then(function(fileContents) {
                    return extractPostData(file, fileContents);
                });
        }));
    })
    .then(function(results) {
        callback(null, results);
    })
    .catch(function (err) {
        callback(err);
    });
};

exports.extractIsoDate = function(dateStr) {

    // Input: NOV 08, 2015 - Output: 2015-11-08
    return moment.utc(dateStr, 'MMM DD, YYYY').format('YYYY-MM-DD').toString();
};

exports.extractLongDate = function(dateStr) {

    // Input: NOV 08, 2015 - Output: Sun, 08 Nov 2015 00:00:00 UTC
    return moment.utc(dateStr, 'MMM DD, YYYY').format('ddd, DD MMM YYYY 00:00:00 +0000').toString();
};

exports.renderWithJade = function(files, jadeTemplate, callback) {

    Q.all(files.map(function(file) {

        var jadeArgs = exports.mergeJSON(constants.JADE_OPTIONS, file.locals);

        return Q.nfcall(jade.renderFile, jadeTemplate, jadeArgs)
            .then(function(html) {
                return Q.nfcall(fs.writeFile, file.name, html);
            });
    }))
    .then(function() {
        callback(null);
    })
    .catch(function(err) {
        callback(err);
    });
};

exports.replaceFileContent = function(fileName, original, replacement, callback) {

    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err)
            callback(err);

        data = data.replace(new RegExp(original, 'g'), replacement);

        fs.writeFile(fileName, data, 'utf8', callback);
    });
};

function extractPostData(fileName, fileContents) {

    var lines = fileContents.toString().split('\n');

    if(lines.length < 6)
        throw constants.MSG_ERROR_INVALID_RAW.replace('{0}', fileName);

    var content = '';
    for (var i = 5; i < lines.length; i++) {
        content += lines[i];
    }

    var postData = {
        title: lines[0].replace('Title:', '').trim(),
        summary: lines[1].replace('Summary:', '').trim(),
        tags: lines[2].replace('Tags:', '').trim(),
        date: lines[3].replace('Date:', '').trim(),
        url: lines[4].replace('URL:', '').trim(),
        content: content.replace(/[\r\n]/g, '\n').trim()
    };

    return postData;
}
