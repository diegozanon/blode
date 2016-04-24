var common = require("../common");
var path = require("path");
var Q = require("q");
var config = common.config;
var constants = common.constants;
var expect = common.expect;
var routesData = common.routesData;
var routesWriter = common.routesWriter;
var utils = common.utils;

describe('routesWriter', function() {

    describe('#writeRoutes()', function() {

        it('should write the routes file following the template', function(done) {

            var routes = Q.denodeify(routesData.routes);
            var getPosts = Q.denodeify(utils.getPosts);
            var writeRoutes = Q.denodeify(routesWriter.writeRoutes);
            var readOneFile = Q.denodeify(common.readOneFile);

            var expectedRoutes = routes();

            var actualRoutes =
              getPosts(config)
              .then(function(posts) {
                  return writeRoutes(config, posts);
              })
              .then(function() {
                  var routesDir = path.join(config.directory, constants.FOLDER_JS);
                  var routesPath = routesDir + '\\routes.js';

                  return readOneFile(routesPath);
              });

            function test(expected, actual) {
                expect(actual).to.be.equal(expected);
            }

            common.testWithPromises(expectedRoutes, actualRoutes, test, done);
        });
    });
});
