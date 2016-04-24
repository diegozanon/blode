exports.posts = function() {

    var title1 = 'Post1';
    var title2 = 'Post2';
    var summary1 = 'Summary of post1.';
    var summary2 = 'Summary of post2.';
    var tags1 = 'Tag1';
    var tags2 = 'Tag1, Tag2';
    var date1 = 'NOV 15, 2015';
    var date2 = 'NOV 21, 2015';
    var url1 = 'post1';
    var url2 = 'post2';
    var content1 = '## Post1 Title  \n\n[blode](https://github.com/zanon-io/blode) was created to automate the build of [zanon.io](http://zanon.io)';
    var content2 = '## Post2 Title  \n\n[blode](https://github.com/zanon-io/blode) was created to automate the build of [zanon.io](http://zanon.io)';

    var post1 = {
        title : title1,
        summary : summary1,
        tags : tags1,
        date : date1,
        url : url1,
        content : content1
    };

    var post2 = {
        title : title2,
        summary : summary2,
        tags : tags2,
        date : date2,
        url : url2,
        content : content2
    };

    return [post1, post2];
};
