var sourceUrl = require('../'),
    expect = require('expect.js'),
    File = require('gulp-util').File;

describe('sourceURL', function() {
  it('appends the sourceUrl signature to the file', function(done) {
    var stream = sourceUrl();

    var fakeFile = new File({
      cwd: __dirname,
      base: __dirname + '/test',
      path: __dirname + '/test/file.js',
      contents: new Buffer('Hello')
    });

    stream.on('data', function(file) {
      var sourceUrlRegex = /\/\/# sourceURL=(.+)$/;
      var contents = file.contents.toString();
      expect(contents.split('\n')).to.have.length(2);
      expect(contents).to.match(sourceUrlRegex);
      expect(contents.match(sourceUrlRegex)[1]).to.be(__dirname + '/test/file.js');
      done();
    });

    stream.write(fakeFile);
    stream.end();
  });
});
