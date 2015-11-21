var common = require("../common");
var expect = common.expect;
var utils = common.utils;

describe('utils', function() {

    describe('#mergeJSON()', function() {

        it('should merge two JSON objects into one', function() {

            var prop1 = 'prop1';
            var prop2 = 'prop2';

            var obj1 = {
                prop1 : prop1
            };

            var obj2 = {
                prop2 : prop2
            };

            var merged = utils.mergeJSON(obj1, obj2);

            expect(merged.prop1).to.be.equal(prop1);
            expect(merged.prop2).to.be.equal(prop2);
        });
    });
});