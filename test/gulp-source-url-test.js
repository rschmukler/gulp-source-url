var sourceUrl = require('../'),
    expect = require('expect.js'),
    File = require('gulp-util').File;

var sourceUrlRegex = /\/\/# sourceURL=((\w|\/|\.|-)+)/;

describe('sourceURL', function() {
  it('appends the sourceUrl signature to the file', function(done) {
    var stream = sourceUrl();

    var fakeFile = new File({
      cwd: __dirname,
      base: __dirname + '/test',
      path: __dirname + '/test/file.js',
      contents: new Buffer('console.log("Hello world")')
    });

    stream.on('data', function(file) {
      var contents = file.contents.toString();
      expect(contents).to.match(sourceUrlRegex);
      expect(contents.match(sourceUrlRegex)[1]).to.be(__dirname + '/test/file.js');
      done();
    });

    stream.write(fakeFile);
    stream.end();
  });

  it('wraps JS in evals', function(done) {
    var stream = sourceUrl();

    var fakeFile = new File({
      cwd: __dirname,
      base: __dirname + '/test',
      path: __dirname + '/test/file.js',
      contents: new Buffer('console.log("Hello world")')
    });

    stream.on('data', function(file) {
      var contents = file.contents.toString();
      expect(contents).to.match(/^eval\(/);
      done();
    });

    stream.write(fakeFile);
    stream.end();
  });

  it('takes an optional relative directory', function(done) {
    var stream = sourceUrl(__dirname);

    var fakeFile = new File({
      cwd: __dirname,
      base: __dirname + '/test',
      path: __dirname + '/test/file.js',
      contents: new Buffer('Hello')
    });

    stream.on('data', function(file) {
      var contents = file.contents.toString();
      expect(contents.match(sourceUrlRegex)[1]).to.be('test/file.js');
      done();
    });

    stream.write(fakeFile);
    stream.end();
  });

  describe('options', function() {
    it('has an anonymous function option', function(done) {
      var stream = sourceUrl(undefined, {anonymous: true});

      var fakeFile = new File({
        cwd: __dirname,
        base: __dirname + '/test',
        path: __dirname + '/test/file.js',
        contents: new Buffer('Hello')
      });

      stream.on('data', function(file) {
        var contents = file.contents.toString();
        expect(contents).to.match(/function\(\) \{.*\}\(\)/);
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });
  });
});
