# blode
blode is a simple Node.js application to create static websites. I've designed it for fun and to create my own blog. You can see the result here: [zanon.io](http://zanon.io).

The Node.js application reads the blog posts written with the [Markdown](http://daringfireball.net/projects/markdown/) syntax and compile them to HTML. Since its a SPA made with Angular, blode also pre-render the pages to improve SEO. For deployment, the content is gzipped and uploaded to Amazon S3.

## Why a static site generator and not Wordpress?
You can use [Jekyll](http://jekyllrb.com/) or [another](http://www.sitepoint.com/6-static-blog-generators-arent-jekyll/) static website generator, but please, don't use Wordpress for blogging! Static websites doesn't need a dedicated server neither a database. This means an extremely fast and cheap website. Also, you don't need to worry about security and server updates. You can read more reasons [here](http://www.sitepoint.com/wordpress-vs-jekyll-might-want-make-switch/).

## Features

- Compiles Markdown files to HTML
- Uses single-page application using AngularJS
- Pre-render pages
- Adds blog posts filters by tags
- Minifies CSS/JS
- gzip and upload to Amazon S3
- Updates the RSS file

## Installing

// TODO

## Configuration

Below follows some instructions about how to use blode. If you have any doubt, please, file an issue and I'll try to help you.

// TODO

You need to create a config.json file at the same level of app.js with the following:

```json
{
  "directory" : "your_directory",
  "awsAccessKeyId" : "your_access_key",
  "awsSecretAccessKey" : "your_secret_key",
  "awsBucketName" : "your_aws_bucket_name"
}
```

## Blog posts

Blog posts should be created using the [Markdown](http://en.wikipedia.org/wiki/Markdown) markup language and you can use your favorite editor to this. If you don't have one, I suggest: [stackedit.io](https://stackedit.io)

blode requires three things:

// TODO: template has changed

- The first line must have the date of the post in the following format: yyyy-mm-dd
- The second line must have a small summary of the blog post content.
- The third line must have one or more tags that will be attached to the blog. E.g.: angularjs, javascript

## How to use

// TODO

1. When you run blode for the first time, it will create 4 folders for you - js, css, images and markdown - in the **input** folder.
2. Place your content in the correspondent folders.
3. Place your index.html (template of your file) at the root of the input folder.
4. blode requires AngularJS for your site. Add its CDN in the header file of index.html or in the js folder.
5. Execute blode. It'll move all files to the **output** folder minifying js/css and compiling Markdown posts.
6. Grab all contents of the output folder and publish your blog. You can use Amazon S3 for this (it is cheap and easy to configure).
