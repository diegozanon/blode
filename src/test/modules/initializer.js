var common = require("../common");
var expect = common.expect;
var constants = common.constants;
var initializer = common.initializer;

describe('initializer', function() {

    describe('#validateInput()', function() {

        it('should reject more than 3 command line arguments', function() {

            process.argv = ["node", "app.js", "directory", "invalid"];
            var errorMsg = constants.MSG_ERROR_ARGS;

            expect(initializer.validateInput).to.throw(errorMsg);
        });
    });

    describe('#getDirectory()', function() {

        it('should retrieve local if it have just 2 command line arguments', function() {

            process.argv = ["node", "app.js"];
            var actualDir = initializer.getDirectory();
            var defaultDir = __dirname;
            var partiallyAdjustedDir = defaultDir.substr(0, defaultDir.lastIndexOf("\\")); // removing "modules" folder
            var expectedDir = partiallyAdjustedDir.substr(0, partiallyAdjustedDir.lastIndexOf("\\")); // removing "test" folder
            expect(actualDir).equal(expectedDir);
        });
    });
});
