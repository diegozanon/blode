function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true,
        writable: false
    });
}

/* ERROR MSGs */

define(
    'MSG_ERROR_CONFIG_NOT_FOUND',
    'config.json not found in root directory or it could not be loaded. \nFollow the documentation available at: https://github.com/zanon-io/blode'
);

define(
    'MSG_ERROR_INVALID_CONFIG',
    'config.json doesn\'t have all required configuration. \nFollow the documentation available at: https://github.com/zanon-io/blode'
);

/* DEBUG MSGs */

define(
    'MSG_DEBUG_START',
    'Starting deploying.'
);

define(
    'MSG_DEBUG_FINISH',
    'Finished deploying.'
);

define(
    'MSG_DEBUG_MARKDOWNER',
    'Parsing markdown posts.'
);

define(
    'MSG_DEBUG_POSTSLIST',
    'Writing posts list file.'
);

define(
    'MSG_DEBUG_ROUTES',
    'Writing routes file.'
);

define(
    'MSG_DEBUG_RSS',
    'Writing RSS file.'
);

define(
    'MSG_DEBUG_FILEMAP',
    'Writing filemap.'
);

define(
    'MSG_DEBUG_PRERENDER',
    'Prerendering.'
);

define(
    'MSG_DEBUG_UPLOADER',
    'Uploading to S3.'
);

/* File names */

define(
    'FILE_POST',
    '\\templates\\post.jade'
);
