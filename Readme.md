# gulp-source-url
Add sourceUrl comments to gulp files. Useful for things like `gulp-concat` and
`gulp-surgeon`.

## Example

```js
var sourceUrls = require('gulp-source-urls');

gulp.src('./lib/*.js')
  .pipe(sourceUrls())
  .pipe(concat('out.js'))
  .pipe(gulp.dest('public/'))
```

## Configuring

### Relative Paths

You can optionally pass a path in, in which case the paths will be relative that
path. For example:

```js
var sourceUrls = require('gulp-source-urls');

gulp.src('./lib/**/*.js')
  .pipe(sourceUrls('./lib'))
  .pipe(concat('out.js'))
  .pipe(gulp.dest('public/'))
```

###

You can also request that the `eval` for the JS be run in an anonymous function.
This can help avoid global namespace variable pollution.

```js
var sourceUrls = require('gulp-source-urls');

gulp.src('./lib/**/*.js')
  .pipe(sourceUrls('./lib', {anonymous: true}))
  .pipe(concat('out.js'))
  .pipe(gulp.dest('public/'))
```
