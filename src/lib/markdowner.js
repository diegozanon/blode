var jade = require('jade');
var Q = require('q');
var constants = require('./constants');
var utils = require('./utils');

exports.markdown = function(config, callback) {

    var postFileName = config.directory + constants.FILE_POST;

    utils.getPosts(config, function(err, posts) {

        if(err)
            callback(err);

        var options = {
            pretty : true
        };

        Q.all(posts.map(function(post) {

            var locals = {
                post : post
            };

            var jadeArgs = utils.mergeJSON(options, locals);

            return Q.nfcall(jade.renderFile, postFileName, jadeArgs)
                .then(function(html) {
                    return html;
                })
        }))
        .then(function(results) {
            callback(null, results);
        })
        .catch(function(err) {
            callback(err);
        });
    });
};
