var ncp = require('ncp').ncp;
var path = require('path');

exports.create = function(name, callback) {

  var source = path.join(__dirname, '../sample');
  var destination = path.join(path.resolve("."), name);

  // copy folder recursively
  ncp(source, destination, function (err) {
    callback(err);
  });
}
