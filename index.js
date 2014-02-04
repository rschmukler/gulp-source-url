var map = require('map-stream'),
    jsStringEscape = require('js-string-escape'),
    path = require('path');

module.exports = function(relative, options) {
  options = options || {};

  return map(function(file, cb) {
    var sourcePath = file.path;
    if(relative) sourcePath = path.relative(relative, sourcePath);

    var contents = file.contents.toString();
    contents += "\n//# sourceURL=" + sourcePath;

    if(isExtension(file.path, 'js')) contents = wrapInFn(contents);

    file.contents = new Buffer(contents);
    cb(null, file);
  });
};

function isExtension(path, extension) {
  return new RegExp('.' + extension + '$').test(path);
}

function wrapInFn(code, anonymousWrap) {
  var result;
  code = jsStringEscape(code);
  result = 'new Function("' + code + '")();';

  return result;
}
