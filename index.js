var map = require('map-stream'),
    path = require('path');

module.exports = function(relative) {
  return map(function(file, cb) {
    var sourcePath = file.path;
    if(relative) sourcePath = path.relative(relative, sourcePath);
    var contents = file.contents.toString();
    contents += "\n//# sourceURL=" + sourcePath;
    file.contents = new Buffer(contents);
    cb(null, file);
  });
};
