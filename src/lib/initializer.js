var constants = require('./constants');

exports.getConfig = function() {

    try {
        return require('../config');
    }
    catch (e) {
        console.error(constants.MSG_ERROR_CONFIG_NOT_FOUND);
        throw e;
    }
};

exports.validate = function(config) {

    if(!config.directory ||
        !config.awsAccessKeyId ||
        !config.awsSecretAccessKey ||
        !config.awsBucketName) {

        throw constants.MSG_ERROR_INVALID_CONFIG;
    }
    else {
        return true;
    }
};