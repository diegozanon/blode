var constants = require('./constants');
var utils = require('./utils');
var fs = require('fs');
var marked = require('marked');
var path = require('path');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

exports.markdown = function(config, callback) {

    var jadeTemplate = path.join(config.directory, constants.FILE_JADE_POST);
    var partialsFolder = path.join(config.directory, constants.FOLDER_PARTIALS);

    utils.getPosts(config, function(err, posts) {

        if(err)
            callback(err);

        var files = [];
        posts.forEach(function(post) {
            post.content = marked(post.content);

            var isoDate = utils.extractIsoDate(post.date);
            var fileName = isoDate + '-' + post.url + '.html';

            var file = {
                locals: { post: post },
                name: path.join(partialsFolder, fileName)
            };

            files.push(file);
        });

        utils.renderWithJade(files, jadeTemplate, function(err) {
            callback(err, posts);
        });
    });
};
