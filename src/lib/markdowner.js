var jade = require('jade');
var constants = require('./constants');
var utils = require('./utils');

exports.markdown = function(config, callback) {

    var postFileName = config.directory + constants.FILE_POST;

    var options = {
        pretty : true
    };

    var locals = {
        post : {
            title : 'a',
            date : 'b',
            content : 'c'
        }
    };

    utils.getPosts(config, function(err, posts) {

        if(err)
            callback(err);

        console.log("Posts:" + posts);

        jade.renderFile(postFileName, utils.mergeJSON(options, locals), function(err, html) {

            if(err)
                callback(err);

            callback(null);
        });
    });
};