var fs = require('fs');
var jade = require('jade');
var marked = require('marked');
var Q = require('q');
var constants = require('./constants');
var utils = require('./utils');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

exports.markdown = function(config, callback) {

    var postFileName = config.directory + constants.FILE_POST;

    utils.getPosts(config, function(err, posts) {

        if(err)
            callback(err);

        var options = {
            pretty : true
        };

        Q.all(posts.map(function(post) {

            post.content = marked(post.content);

            var locals = {
                post : post
            };

            var jadeArgs = utils.mergeJSON(options, locals);

            return Q.nfcall(jade.renderFile, postFileName, jadeArgs)
                .then(function(html) {

                    var partialFileName =
                      config.directory +
                      constants.FOLDER_PARTIALS + '\\' +
                      utils.extractDate(post.date) +
                      '-' + post.url + '.html';

                    return Q.nfcall(fs.writeFile, partialFileName, html)
                });
        }))
        .then(function() {
            callback(null);
        })
        .catch(function(err) {
            callback(err);
        });
    });
};
