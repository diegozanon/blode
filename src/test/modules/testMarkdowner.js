var common = require("../common");
var config = common.config;
var constants = common.constants;
var expect = common.expect;
var markdowner = common.markdowner;
var partialsData = common.partialsData;
var path = require('path');

describe('markdowner', function() {

    describe('#markdown()', function() {

        it('should parse files and output the results following the template', function(done) {

            markdowner.markdown(config, function(err) {

                if(err) throw err;

                getDataToCompare(function(err, actualPartials, expectedPartials) {

                    if(err) throw err;

                    expect(actualPartials.length).to.be.equal(expectedPartials.length);
                    expect(actualPartials).to.be.deep.equal(expectedPartials);

                    done();
                });
            });
        });
    });
});

function getDataToCompare(callback) {

  partialsData.partials(function(err, expectedPartials) {

      if(err) callback(err);

      getActualPartials(function(err, actualPartials) {

          callback(err, actualPartials, expectedPartials);
      });
  });
};

function getActualPartials(callback) {

    var partialsDir = path.join(config.directory, constants.FOLDER_PARTIALS);
    var pathPartial1 = partialsDir + '\\2015-11-15-post1.html';
    var pathPartial2 = partialsDir + '\\2015-11-21-post2.html';

    common.readTwoFiles(pathPartial1, pathPartial2, function(err, actualPartials) {
        callback(err, actualPartials);
    });
};
