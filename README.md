# blode
blode is a simple Node.js application to create static websites. I've designed it to create my own blog and you can see the result here: [zanon.io](http://zanon.io)

The Node.js application reads the blog posts written with the [Markdown](http://daringfireball.net/projects/markdown/) syntax and compile them to HTML. The template uses AngularJS to control how posts are filtered by tags, infinite scrolling to retrieve more posts and how to change pages without a full reload, giving a nice performance gain.

I've also created a NW.js (former Node-Webkit) user interface to simplify the environment configuration.

## Why blode and not another static site generator?
In fact, you should not choose blode. Choose it only if you liked the result and if you want to create a very similar blog. If you have different needs, [Jekyll](http://jekyllrb.com/) is the best and most popular static site generator and have tons of templates available. You can also follow this article for more suggestions: http://www.sitepoint.com/6-static-blog-generators-arent-jekyll/

Please, just avoid using Wordpress for blogging. Static websites don't need a dedicated server neither a database. This means an extremely fast and cheap website. Also, you don't need to worry about security and server updates. This nice blog posts explains this with more detail: http://www.sitepoint.com/wordpress-vs-jekyll-might-want-make-switch/

If you are still here and want to try blode, follow the configuration steps below. If you have any doubt, please, file an issue and I'll try to help you.

## Features

- Compiles Markdown files to HTML
- Uses single-page application using AngularJS (ngRoute)
- Infinite scrolling
- Adds blog posts filters by tags
- Minifies CSS/JS
- Has user interface (NW.js)

## Installing

// todo

## Configuration

The first time that you run blode, you'll need to configure the following:

- The **input** and **output** folders.
- Tags that you want to filter

## Blog posts

Blog posts should be created using the [Markdown](http://en.wikipedia.org/wiki/Markdown) markup language and you can use your favorite editor to this. If you don't have one, I suggest: [stackedit.io](https://stackedit.io)

blode requires three things:
- The first line must have the date of the post in the following format: yyyy-mm-dd
- The second line must have a small summary of the blog post content.
- The third line must have one or more tags that will be attached to the blog. E.g.: angularjs, javascript

## How to use

1. When you run blode for the first time, it will create 4 folders for you - js, css, images and markdown -  in the **input** folder.
2. Place your content in the correspondent folders.
3. Place your index.html (template of your file) at the root of the input folder.
4. blode requires AngularJS for your site. Add its CDN in the header file of index.html or in the js folder.
5. Execute blode. It'll move all files to the **output** folder minifying js/css and compiling Markdown posts.
6. Grab all contents of the output folder and publish your blog. You can use Amazon S3 for this (it is cheap and easy to configure).
