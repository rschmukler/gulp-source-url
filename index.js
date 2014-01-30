var map = require('map-stream'),
    jsStringEscape = require('js-string-escape'),
    path = require('path');

module.exports = function(relative) {
  return map(function(file, cb) {
    var sourcePath = file.path;
    if(relative) sourcePath = path.relative(relative, sourcePath);

    var contents = file.contents.toString();
    contents += "\n//# sourceURL=" + sourcePath;

    if(isExtension(file.path, 'js')) contents = wrapInEval(contents);

    file.contents = new Buffer(contents);
    cb(null, file);
  });
};

function isExtension(path, extension) {
  return new RegExp('.' + extension + '$').test(path);
}

function wrapInEval(code) {
  code = jsStringEscape(code);
  return 'eval("' + code + '");';
}
