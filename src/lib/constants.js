function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true,
        writable: false
    });
}

define(
    'MSG_ERROR_CONFIG_NOT_FOUND',
    'config.json not found in root. \nFollow the documentation available at: https://github.com/zanon-io/blode'
);