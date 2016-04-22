var constants = require('./constants');

exports.getCmd = function() {

  // node app new my-blog
  if (process.argv.length === 4 && process.argv[2] === constants.ARG_NEW) {
    return {
      createNew: true,
      arg: process.argv[3]
    }
  }
  // node app deploy
  else if (process.argv.length === 3 && process.argv[2] === constants.ARG_DEPLOY) {
    return {
      deploy: true
    }
  }
  // not mapped
  else {
    throw constants.MSG_ERROR_INVALID_ARGS;
  }
}

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

    if(!config.directory) {
        throw constants.MSG_ERROR_INVALID_CONFIG;
    }
    else {
        return true;
    }
};
