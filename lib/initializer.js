var constants = require('./constants');
var path = require('path');

exports.getCmd = function() {

  // node index new my-blog
  if (process.argv.length === 4 && process.argv[2] === constants.ARG_NEW) {
    return {
      name: constants.ARG_NEW,
      arg: process.argv[3]
    };
  }
  // node index build
  else if (process.argv.length === 3 && process.argv[2] === constants.ARG_BUILD) {
    return {
      name: constants.ARG_BUILD
    };
  }
  // node index run-local
  else if (process.argv.length === 3 && process.argv[2] === constants.ARG_RUN_LOCAL) {
    return {
      name: constants.ARG_RUN_LOCAL
    };
  }
  // node index publish
  else if (process.argv.length === 3 && process.argv[2] === constants.ARG_PUBLISH) {
    return {
      name: constants.ARG_PUBLISH
    };
  }
  // not mapped
  else {
    throw constants.MSG_ERROR_INVALID_ARGS;
  }
};

exports.getConfig = function() {

    try {
        var configPath = path.join(path.resolve("."), 'config');
        return require(configPath);
    }
    catch (e) {
        console.error(constants.MSG_ERROR_CONFIG_NOT_FOUND);
        throw e;
    }
};

exports.validate = function(config) {

    if(!config.awsBucketName) {
        throw constants.MSG_ERROR_INVALID_CONFIG;
    }
    else {
        return true;
    }
};
