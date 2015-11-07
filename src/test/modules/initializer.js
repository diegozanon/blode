var common = require("../common");
var expect = common.expect;
var constants = common.constants;
var initializer = common.initializer;

describe('initializer', function() {

    describe('#validateArguments()', function() {

        it('should reject more than 3 command line arguments', function() {

            process.argv = ["node", "app.js", "directory", "invalid"];
            var errorMsg = constants.MSG_ERROR_ARGS;

            expect(initializer.validateArguments).to.throw(errorMsg);
        });
    });

    describe('#getDirectory()', function() {

        it('should retrieve local if it has just 2 command line arguments', function() {

            process.argv = ["node", "app.js"];
            var actualDir = initializer.getDirectory();
            var defaultDir = __dirname;
            var partiallyAdjustedDir = defaultDir.substr(0, defaultDir.lastIndexOf("\\")); // removing "modules" folder
            var expectedDir = partiallyAdjustedDir.substr(0, partiallyAdjustedDir.lastIndexOf("\\")); // removing "test" folder

            expect(actualDir).equal(expectedDir);
        });
    });

    describe('#getDirectory()', function() {

        it('should use input folder if it is passes as a command line argument', function() {

            var expectedDir = "C:\\temp";
            process.argv = ["node", "app.js", expectedDir];
            var actualDir = initializer.getDirectory();

            expect(actualDir).equal(expectedDir);
        });
    });

    describe('#getConfig()', function() {

        it('should validate if all options are available', function() {
            // TODO: test
            initializer.getConfig();
        });
    });
});
