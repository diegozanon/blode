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

        it('should find posts and return its contents', function() {

            var expectedPosts = postsData.posts();

            var actualPosts = utils.getPosts(config);

            expect(actualPosts.length).to.be.equal(expectedPosts.length);
            expect(JSON.stringify(actualPosts)).to.be.equal(JSON.stringify(expectedPosts));
        });
    });
});