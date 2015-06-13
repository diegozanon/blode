# blode
A simple Node.js application to create static websites. Write your posts using [Markdown](http://daringfireball.net/projects/markdown/) and use blode to compile them to HTML. Also, it offers a structure to navigate through your posts, filter them using tags and to use infinite scrolling.

**Warning**: it is not ready yet.

An example of a simple blog using blode: [zanon.io](http://zanon.io)

blode helps you to create static blogs: no servers neither databases means extremely fast and cheap blogs.

blode doesn't help you to create fancy and cool blogs. Grab a nice template out there and use blode to help you to manage blog posts.

# Features

- Compiles Markdown files to HTML
- Uses single-page application using AngularJS (ngRoute)
- Infinite scrolling
- Adds blog posts filters by tags
- Minifies CSS/JS
- Has user interface (nw.js)

# Installing

// todo

# Configuration

The first time that you run blode, you'll need to configure the following:

- The **input** and **output** folders.
- Tags that you want to filter

# Blog posts

Blog posts should be created using the [Markdown](http://en.wikipedia.org/wiki/Markdown) markup language and you can use your favorite editor to this. If you don't have one, I suggest: [stackedit.io](https://stackedit.io)

blode requires three things:
- The first line must have the date of the post in the following format: yyyy-mm-dd
- The second line must have a small summary of the blog post content.
- The third line must have one or more tags that will be attached to the blog. E.g.: angularjs, javascript

# How to use

1. When you run blode for the first time, it will create 4 folders for you - js, css, images and markdown -  in the **input** folder.
2. Place your content in the correspondent folders.
3. Place your index.html (template of your file) at the root of the input folder.
4. blode requires AngularJS for your site. Add its CDN in the header file of index.html or in the js folder.
5. Execute blode. It'll move all files to the **output** folder minifying js/css and compiling Markdown posts.
6. Grab all contents of the output folder and publish your blog. You can use Amazon S3 for this (it is cheap and easy to configure).