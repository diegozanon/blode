var common = require("../common");
var Q = require('q');
var config = common.config;
var constants = common.constants;
var expect = common.expect;
var markdowner = common.markdowner;
var partialsData = common.partialsData;
var path = require('path');

describe('markdowner', function() {

    describe('#markdown()', function() {

        it('should parse files and output the results following the template', function(done) {

            var partials = Q.denodeify(partialsData.partials);
            var markdown = Q.denodeify(markdowner.markdown);
            var readTwoFiles = Q.denodeify(common.readTwoFiles);

            var expectedPartials = partials();

            var actualPartials =
              markdown(config)
              .then(function() {

                  var partialsDir = path.join(config.directory, constants.FOLDER_PARTIALS);
                  var partialPath1 = partialsDir + '\\2015-11-15-post1.html';
                  var partialPath2 = partialsDir + '\\2015-11-21-post2.html';

                  return readTwoFiles(partialPath1, partialPath2);
              });

            Q.all([expectedPartials, actualPartials])
              .spread(function(expected, actual) {
                  expect(actual.length).to.be.equal(expected.length);
                  expect(actual).to.be.deep.equal(expected);
              })
              .done(function() {
                  done();
              });
        });
    });
});
