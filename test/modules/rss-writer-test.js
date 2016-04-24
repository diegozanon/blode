var common = require("../common");
var Q = require("q");
var config = common.config;
var constants = common.constants;
var expect = common.expect;
var rssData = common.rssData;
var rssWriter = common.rssWriter;
var utils = common.utils;

describe('rssWriter', function() {

    describe('#writeRss()', function() {

        it('should write the rss file following the template', function(done) {

          var rss = Q.denodeify(rssData.rss);
          var getPosts = Q.denodeify(utils.getPosts);
          var writeRss = Q.denodeify(rssWriter.writeRss);
          var readOneFile = Q.denodeify(common.readOneFile);

          var expectedRss = rss();

          var actualRss =
            getPosts(config)
            .then(function(posts) {
                return writeRss(config, posts);
            })
            .then(function() {
                var rssDir = config.directory;
                var rssPath = rssDir + '\\feed.xml';

                return readOneFile(rssPath);
            });

          function test(expected, actual) {
              expect(actual).to.be.equal(expected);
          }

          common.testWithPromises(expectedRss, actualRss, test, done);
        });
    });
});
