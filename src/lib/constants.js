function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true,
        writable: false
    });
}

define(
    'MSG_ERROR_ARGS',
    'Error: invalid number of arguments. \nUsage: node app.js [directory]'
);

define(
    'MSG_ERROR_OPTS_NOT_FOUND',
    'Error: config.json not found in root. \nFollow the documentation available at: https://github.com/zanon-io/blode'
);