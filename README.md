# blode
blode is a simple Node.js application to create static blogs. I've designed it for fun and to create my own blog. You can see the result here: [zanon.io](http://zanon.io).

The Node.js application reads the blog posts written with the [Markdown](http://daringfireball.net/projects/markdown/) syntax and compile them to HTML. Since it's a SPA made with Angular, blode also pre-render the pages to improve SEO. For deployment, the content is gzipped and uploaded to Amazon S3.

## Why a static site generator and not Wordpress?
You can use [Jekyll](http://jekyllrb.com/) or [another](http://www.sitepoint.com/6-static-blog-generators-arent-jekyll/) static website generator, but please, don't use Wordpress for blogging! Static websites don't need a dedicated server neither a database. A serverless blog means an extremely fast and cheap website. Also, you don't need to worry about security and server updates. You can read more reasons [here](http://www.sitepoint.com/wordpress-vs-jekyll-might-want-make-switch/).

## Features

- Compiles Markdown files to HTML
- Uses single-page application using AngularJS
- Pre-render pages
- Adds blog posts filters by tags
- Minifies CSS/JS
- gzip and upload to Amazon S3
- Updates the RSS file

## Installing

```
> npm install static-blode -g
```
// TODO: not deployed yet to NPM

## How to use

Below follows some instructions about how to use blode. If you have any doubt, please, file an issue and I'll try to help you.

### Create a sample blog

The first step is to generate the blog sample files:
```
> blode new my-blog-folder
```

### Configuration

You need to modify the config.json file the is located at root level of your blog. Fill the following properties:

```json
{
  "directory" : "your_directory",
  "awsAccessKeyId" : "your_access_key",
  "awsSecretAccessKey" : "your_secret_key",
  "awsBucketName" : "your_aws_bucket_name"
}
```

### Deploy

After modifying the raw markdown files inside the raw folder, deploy the blog with:
```
> blode deploy
```

## Blog posts

Blog posts should be created using the [Markdown](http://en.wikipedia.org/wiki/Markdown) markup language and you can use your favorite editor to this. If you don't have one, I suggest: [stackedit.io](https://stackedit.io)

blode requires that each post uses the following format:  

<pre>
<code>
Title: < Post Title >  
Summary: < Summary of post. >  
Tags: < TagX >  
Date: < NOV 15, 2015 >  
URL: < post-url >  

< ##  Post Title  >  

< Here starts the content of your Post >  
</code>
</pre>

**Note:** replace &lt; text &gt; by your data.
