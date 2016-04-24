var common = require("../common");
var expect = common.expect;
var constants = common.constants;
var initializer = common.initializer;

describe('initializer', function() {

  describe('#getCmd()', function() {

      it('should validate cmd line args and throw except if format not mapped', function() {

        var tests = [
            { args : ['', '', 'new', 'my-blog'], valid : true, result: { name: constants.ARG_NEW, arg: 'my-blog' } },
            { args : ['', '', 'build'], valid : true, result: { name: constants.ARG_BUILD } },
            { args : ['', '', 'deploy'], valid : true, result: { name: constants.ARG_DEPLOY } },
            { args : ['', ''], valid : false },
            { args : ['', '', ''], valid : false },
            { args : ['', '', '', ''], valid : false },
            { args : ['', '', '', '', ''], valid : false },
            { args : ['', '', 'new'], valid : false },
            { args : ['', '', 'build', ''], valid : false },
            { args : ['', '', 'deploy', ''], valid : false }
        ];

        tests.forEach(function(test) {

            process.argv = test.args;

            if (test.valid) {
                expect(initializer.getCmd()).to.deep.equal(test.result);
            } else {

                var getCmd = function() {
                    initializer.getCmd();
                };

                expect(getCmd).to.throw(constants.MSG_ERROR_INVALID_ARGS);
            }
        });
      });
  });

    describe('#getConfig()', function() {

        it('should not throw error if file exist', function() {

            expect(initializer.getConfig).to.be.ok;
        });
    });

    describe('#validate()', function() {

        it('should validate if all mandatory options are available', function() {

            var tests = [
                { config : { awsAccessKeyId : 'a', awsSecretAccessKey : 'b', awsRegion: 'c', awsBucketName : 'd'}, valid : true},
                { config : { awsAccessKeyId : 'a', awsSecretAccessKey : 'b', awsRegion: 'c' }, valid : false},
                { config : { awsBucketName : 'd'}, valid : true},
                { config : { }, valid : false},
                { config : { something: 'a' }, valid : false}
            ];

            tests.forEach(function(test) {

                if (test.valid) {
                    expect(initializer.validate(test.config)).to.be.ok;
                } else {

                    var validate = function() {
                        initializer.validate(test.config);
                    };

                    expect(validate).to.throw(constants.MSG_ERROR_INVALID_CONFIG);
                }
            });
        });
    });
});
