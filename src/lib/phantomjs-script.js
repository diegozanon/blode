try {

  var fs = require('fs');
  var page = require('webpage').create();
  var args = require('system').args;
  var constants = require('./constants');

  if (args.length == 4) {

    var pageName = args[1];
    var outputFile = args[2];
    var outputPath = args[3];

    page.open(pageName, function (status) {

      if (status != 'success') {
        console.error(status);
      } else {
        fs.write(outputPath + '/' + outputFile, page.content, 'w');
        console.log(constants.MSG_DEBUG_PRERENDER_FILE_CREATED.replace('{0}', outputFile));
      }

      phantom.exit();
    });

  } else {
    console.error(constants.MSG_ERROR_INVALID_PHANTOM_ARGS);
    phantom.exit();
  }

} catch (e) {
   console.error(e);
}
