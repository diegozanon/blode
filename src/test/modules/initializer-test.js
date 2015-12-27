var common = require("../common");
var expect = common.expect;
var constants = common.constants;
var initializer = common.initializer;

describe('initializer', function() {

    describe('#getConfig()', function() {

        it('should not throw error if file exist', function() {

            expect(initializer.getConfig).to.be.ok;
        });
    });

    describe('#validate()', function() {

        it('should validate if all mandatory options are available', function() {

            var tests = [
                { config : { directory : 'a', awsAccessKeyId : 'b', awsSecretAccessKey : 'c', awsRegion: 'd', awsBucketName : 'e'}, valid : true},
                { config : { directory : 'a', awsAccessKeyId : 'b', awsSecretAccessKey : 'c'}, valid : true},
                { config : { directory : 'a' }, valid : true},
                { config : { awsAccessKeyId : 'b', awsSecretAccessKey : 'c', awsBucketName : 'e'}, valid : false},
                { config : { }, valid : false}
            ];

            tests.forEach(function(test){

                if (test.valid) {
                    expect(initializer.validate(test.config)).to.be.ok;
                }
                else {

                    var validate = function() {
                        initializer.validate(test.config)
                    };

                    expect(validate).to.throw(constants.MSG_ERROR_INVALID_CONFIG);
                }
            });
        });
    });
});
