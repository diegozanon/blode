var fs = require('fs');
var marked = require('marked');
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

    var jadeTemplate = config.directory + constants.FILE_JADE_POST;
    var partialsFolder = config.directory + constants.FOLDER_PARTIALS;

    utils.getPosts(config, function(err, posts) {

        if(err)
            callback(err);

        var files = [];
        posts.forEach(function(post) {
            post.content = marked(post.content);

            var postDate = utils.extractDate(post.date)
            var fileName = postDate + '-' + post.url + '.html';

            var file = {
                locals: { post: post },
                name: partialsFolder + '\\' + fileName
            };

            files.push(file);
        });

        utils.renderWithJade(files, jadeTemplate, function(err) {
            callback(err, posts);
        });
    });
};
