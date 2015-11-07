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