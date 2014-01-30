var map = require('map-stream');

module.exports = function() {
  return map(function(file, cb) {
    var path = file.path;
    var contents = file.contents.toString();
    contents += "\n//# sourceURL=" + path;
    file.contents = new Buffer(contents);
    cb(null, file);
  });
};
