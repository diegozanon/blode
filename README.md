# blode
blode is a simple Node.js application to create static websites. I've designed it for fun and to create my own blog. You can see the result here: [zanon.io](http://zanon.io).

The Node.js application reads the blog posts written with the [Markdown](http://daringfireball.net/projects/markdown/) syntax and compile them to HTML. Since its a SPA made with Angular, blode also pre-render the pages to improve SEO. For deployment, the content is gzipped and uploaded to Amazon S3.

## Why a static site generator and not Wordpress?
You can use [Jekyll](http://jekyllrb.com/) or [another](http://www.sitepoint.com/6-static-blog-generators-arent-jekyll/) static website generator, but please, don't use Wordpress for blogging! Static websites doesn't need a dedicated server neither a database. A serverless blog means an extremely fast and cheap website. Also, you don't need to worry about security and server updates. You can read more reasons [here](http://www.sitepoint.com/wordpress-vs-jekyll-might-want-make-switch/).

## Features

- Compiles Markdown files to HTML
- Uses single-page application using AngularJS
- Pre-render pages
- Adds blog posts filters by tags
- Minifies CSS/JS
- gzip and upload to Amazon S3
- Updates the RSS file

## Installing

// TODO: not deployed yet to NPM

```
> npm install blode -g
```

## Configuration

Below follows some instructions about how to use blode. If you have any doubt, please, file an issue and I'll try to help you.

The first step, is to generate the boilerplate blog:
```
> blode boilerplate
```

After creating new posts, adding markdown files inside the raw folder, build the blog with:
```
> blode build
```

If you have configured a AWS account, you can deploy the blog directly to S3:
```
> blode deploy
```

## Configuration

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

blode requires that each post follows this structure:

> Title: Post1  
> Summary: Summary of post1.  
> Tags: Tag1  
> Date: NOV 15, 2015  
> URL: post1  
>  
> ## Post1 Title  
>  
> <Here starts the content of your Post>  
