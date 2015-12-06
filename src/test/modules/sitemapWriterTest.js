var common = require("../common");
var Q = require("q");
var config = common.config;
var constants = common.constants;
var expect = common.expect;
var sitemapData = common.sitemapData;
var sitemapWriter = common.sitemapWriter;
var utils = common.utils;

describe('sitemapWriter', function() {

    describe('#writeSitemap()', function() {

        it('should write the sitemap following the template', function(done) {

          var sitemap = Q.denodeify(sitemapData.sitemap);
          var getPosts = Q.denodeify(utils.getPosts);
          var writeSitemap = Q.denodeify(sitemapWriter.writeSitemap);
          var readOneFile = Q.denodeify(common.readOneFile);

          var expectedFile = sitemap();

          var actualFile =
            getPosts(config)
            .then(function(posts) {
                return writeSitemap(config, posts);
            })
            .then(function() {
                var sitemapDir = config.directory;
                var sitemapPath = sitemapDir + '\\sitemap.xml';

                return readOneFile(sitemapPath);
            });

          Q.all([expectedFile, actualFile])
            .spread(function(expected, actual) {
                expect(actual).to.be.equal(expected);
            })
            .done(function() {
                done();
            });
        });
    });
});
