var common = require("../common");
var expect = common.expect;
var utils = common.utils;
var config = common.config;
var postsData = common.postsData;

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

    describe('#getPosts()', function() {

        it('should find posts and return its contents', function(done) {

            var expectedPosts = postsData.posts();

            utils.getPosts(config, function(err, actualPosts) {

                expect(actualPosts.length).to.be.equal(expectedPosts.length);
                expect(JSON.stringify(actualPosts)).to.be.equal(JSON.stringify(expectedPosts));

                done();
            });
        });
    });

    describe('#extractIsoDate()', function() {

        it('should convert string dates to ISO format', function() {

            var tests = [
                  { value: 'Nov 08, 2015', expected: new Date('2015-11-08') },
                  { value: 'Jan 8, 2014', expected: new Date('2014-01-08') },
                  { value: 'DEC 25, 2013', expected: new Date('2013-12-25') }
            ];

            tests.forEach(function(test){
                var actual = new Date(utils.extractIsoDate(test.value));
                expect(actual).to.equalDate(test.expected);
            });
        });
    });

    describe('#renderWithJade()', function() {
        // already tested when called by testMarkdowner and others
    });
});
