function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true,
        writable: false
    });
}

define('MSG_DOC_REPO', 'Follow the documentation available at: https://github.com/zanon-io/blode');

/* ERROR MSGs */
define('MSG_ERROR_CONFIG_NOT_FOUND', 'config.json not found in root directory or it could not be loaded.\n' + this.MSG_DOC_REPO);
define('MSG_ERROR_INVALID_CONFIG', 'config.json doesn\'t have all required configuration.\n' + this.MSG_DOC_REPO);
define('MSG_ERROR_INVALID_RAW', 'Raw file "{0}" is invalid.\n' + this.MSG_DOC_REPO);

/* DEBUG MSGs */
define('MSG_DEBUG_START', 'Starting deploying.');
define('MSG_DEBUG_FINISH', 'Finished deploying.');
define('MSG_DEBUG_MARKDOWNER', 'Parsing markdown posts.');
define('MSG_DEBUG_POSTSLIST', 'Writing posts list file.');
define('MSG_DEBUG_ROUTES', 'Writing routes file.');
define('MSG_DEBUG_RSS', 'Writing RSS file.');
define('MSG_DEBUG_SITEMAP', 'Writing sitemap.');
define('MSG_DEBUG_PRERENDER', 'Prerendering.');
define('MSG_DEBUG_UPLOADER', 'Uploading to S3.');

/* Folders */
define('FOLDER_JS', '\\js');
define('FOLDER_PARTIALS', '\\partials');
define('FOLDER_RAW', '\\raw');
define('FOLDER_TEMPLATES', '\\templates');

/* File names */
define('FILE_HTML_POSTS', this.FOLDER_PARTIALS + '\\posts.html');
define('FILE_JADE_POST', this.FOLDER_TEMPLATES + '\\post.jade');
define('FILE_JADE_POSTLIST', this.FOLDER_TEMPLATES + '\\postList.jade');
define('FILE_JADE_RSS', this.FOLDER_TEMPLATES + '\\feed.jade');
define('FILE_JADE_SITEMAP', this.FOLDER_TEMPLATES + '\\sitemap.jade');
define('FILE_JS_ROUTES', this.FOLDER_JS + '\\routes.js');
define('FILE_JS_ROUTES_TEMPLATE', this.FOLDER_TEMPLATES + '\\routes.js');
define('FILE_XML_RSS', '\\feed.xml');
define('FILE_XML_SITEMAP', '\\sitemap.xml');

/* Configs */
define('JADE_OPTIONS', { pretty : true });
