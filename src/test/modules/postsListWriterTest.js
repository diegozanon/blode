var common = require("../common");
var path = require('path');
var Q = require('q');
var config = common.config;
var constants = common.constants;
var expect = common.expect;
var postsHtmlData = common.postsHtmlData;
var postsListWriter = common.postsListWriter;
var utils = common.utils;

describe('postsListWriter', function() {

    describe('#writePostsList()', function() {

        it('should write the posts list following the template', function(done) {

            var postsHtml = Q.denodeify(postsHtmlData.postsHtml);
            var getPosts = Q.denodeify(utils.getPosts);
            var writePostsList = Q.denodeify(postsListWriter.writePostsList);
            var readOneFile = Q.denodeify(common.readOneFile);

            var expectedPostsHtml = postsHtml();

            var actualPostsHtml =
              getPosts(config)
              .then(function(posts) {
                  return writePostsList(config, posts);
              })
              .then(function() {
                  var postsDir = path.join(config.directory, constants.FOLDER_PARTIALS);
                  var postsPath = postsDir + '\\posts.html';

                  return readOneFile(postsPath);
              });

            function test(expected, actual) {
                expect(actual).to.be.equal(expected);
            }

            common.testWithPromises(expectedPostsHtml, actualPostsHtml, test, done);
        });
    });
});
