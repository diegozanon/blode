function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true,
        writable: false
    });
}

/* DEBUG MSGs */
define('MSG_DEBUG_START', 'Starting deploying.');
define('MSG_DEBUG_FINISH', 'Finished deploying.');
define('MSG_DEBUG_MARKDOWNER', 'Parsing markdown posts.');
define('MSG_DEBUG_POSTSLIST', 'Writing posts list file.');
define('MSG_DEBUG_ROUTES', 'Writing routes file.');
define('MSG_DEBUG_RSS', 'Writing RSS file.');
define('MSG_DEBUG_SITEMAP', 'Writing sitemap.');
define('MSG_DEBUG_PRERENDER', 'Prerendering.');
define('MSG_DEBUG_PRERENDER_FILE_CREATED', 'File "{0}" was pre-rendered.');
define('MSG_DEBUG_UPLOADER', 'Uploading to S3.');

/* Partial MSGS */
define('MSG_DOC_REPO', 'Follow the documentation available at: https://github.com/zanon-io/blode');

/* ERROR MSGs */
define('MSG_ERROR_CONFIG_NOT_FOUND', 'config.json not found in root directory or it could not be loaded.\n' + this.MSG_DOC_REPO);
define('MSG_ERROR_INVALID_CONFIG', 'config.json doesn\'t have all required configuration.\n' + this.MSG_DOC_REPO);
define('MSG_ERROR_INVALID_RAW', 'Raw file "{0}" is invalid.\n' + this.MSG_DOC_REPO);
define('MSG_ERROR_INVALID_PHANTOM_ARGS', 'Arguments should be passed as: <script_path> <page_name> <output_name> <output_path>');

/* Folders */
define('FOLDER_CSS', '\\css');
define('FOLDER_IMAGES', '\\images');
define('FOLDER_IMAGES_POSTS', '\\images\\posts');
define('FOLDER_JS', '\\js');
define('FOLDER_JS_ASSETS', '\\js\\assets');
define('FOLDER_PARTIALS', '\\partials');
define('FOLDER_POSTS', '\\posts');
define('FOLDER_PRERENDERED', '\\prerendered');
define('FOLDER_RAW', '\\raw');
define('FOLDER_TEMPLATES', '\\templates');

/* AWS Folder */
define('FOLDER_AWS_CSS', 'css/');
define('FOLDER_AWS_IMAGES', 'images/');
define('FOLDER_AWS_IMAGES_POSTS', 'images/posts/');
define('FOLDER_AWS_JS', 'js/');
define('FOLDER_AWS_JS_ASSETS', 'js/assets/');
define('FOLDER_AWS_PARTIALS', 'partials/');
define('FOLDER_AWS_POSTS', 'posts/');

/* File names */
define('FILE_NAME_CSS_SITE', 'site.css');
define('FILE_NAME_HTML_404', '404.html');
define('FILE_NAME_HTML_POSTS', 'posts.html');
define('FILE_NAME_HTML_INDEX', 'index.html');
define('FILE_NAME_ICO_FAVICON', 'favicon.ico');
define('FILE_NAME_JS_APP', 'app.js');
define('FILE_NAME_JS_CONTROLLERS', 'controllers.js');
define('FILE_NAME_JS_DIRECTIVES', 'directives.js');
define('FILE_NAME_JS_NGCLOAK', 'ng-cloak.js');
define('FILE_NAME_JS_ROUTES', 'routes.js');
define('FILE_NAME_PRERENDERED_404', '404');
define('FILE_NAME_XML_RSS', 'feed.xml');
define('FILE_NAME_XML_SITEMAP', 'sitemap.xml');

/* File paths */
define('FILE_CSS_SITE', this.FOLDER_CSS + '\\' + this.FILE_NAME_CSS_SITE);
define('FILE_HTML_404', this.FOLDER_PARTIALS + '\\' + this.FILE_NAME_HTML_404);
define('FILE_HTML_POSTS', this.FOLDER_PARTIALS + '\\' + this.FILE_NAME_HTML_POSTS);
define('FILE_HTML_404_PRERENDERED', this.FOLDER_PRERENDERED + '\\' + this.FILE_NAME_PRERENDERED_404);
define('FILE_HTML_INDEX_PRERENDERED', this.FOLDER_PRERENDERED + '\\' + this.FILE_NAME_HTML_INDEX);
define('FILE_ICO_FAVICON', '\\' + this.FILE_NAME_ICO_FAVICON);
define('FILE_JADE_POST', this.FOLDER_TEMPLATES + '\\post.jade');
define('FILE_JADE_POSTLIST', this.FOLDER_TEMPLATES + '\\postList.jade');
define('FILE_JADE_RSS', this.FOLDER_TEMPLATES + '\\feed.jade');
define('FILE_JADE_SITEMAP', this.FOLDER_TEMPLATES + '\\sitemap.jade');
define('FILE_JS_APP', this.FOLDER_JS + '\\' + this.FILE_NAME_JS_APP);
define('FILE_JS_CONTROLLERS', this.FOLDER_JS + '\\' + this.FILE_NAME_JS_CONTROLLERS);
define('FILE_JS_DIRECTIVES', this.FOLDER_JS + '\\' + this.FILE_NAME_JS_DIRECTIVES);
define('FILE_JS_NGCLOAK', this.FOLDER_JS + '\\' + this.FILE_NAME_JS_NGCLOAK);
define('FILE_JS_ROUTES', this.FOLDER_JS + '\\' + this.FILE_NAME_JS_ROUTES);
define('FILE_JS_ROUTES_TEMPLATE', this.FOLDER_TEMPLATES + '\\' + this.FILE_NAME_JS_ROUTES);
define('FILE_XML_RSS', '\\' + this.FILE_NAME_XML_RSS);
define('FILE_XML_SITEMAP', '\\' + this.FILE_NAME_XML_SITEMAP);

/* Configs */
define('JADE_OPTIONS', { pretty : true });
define('STAGING_HOSTED_URL', 'http://localhost');
define('PHANTOMJS_SCRIPT', 'phantomjs-script.js');
define('AWS_ACL', 'public-read');

/* Replace Content */
define('REPLACE_NGVIEW', 'ng-view-background ng-scope');
define('REPLACE_NGVIEW_NGCLOAK', 'ng-view-background ng-scope ng-cloak');
define('REPLACE_NGCLOAK_CLASS', '\\.ng-cloak'); // scaped dot for regex parser
define('REPLACE_NGCLOAK_INVALID_CLASS', '.ng-cloak-invalid');

/* Content-Types */
define('CONTENT_TYPE_CSS', 'text/css');
define('CONTENT_TYPE_HTML', 'text/html');
define('CONTENT_TYPE_ICO', 'image/x-icon');
define('CONTENT_TYPE_JS', 'application/x-javascript');
define('CONTENT_TYPE_PNG', 'image/png');
define('CONTENT_TYPE_XML', 'text/xml');
