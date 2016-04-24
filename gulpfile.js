var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

var paths = {
  scripts: ['./lib/*.js', './test/**/*.js']
};

gulp.task('mocha', function() {
  return gulp.src(paths.scripts)
    .pipe(mocha())
    .on('error', function(err) {
      this.emit('end');
    });
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['mocha']);
  gulp.watch(paths.scripts, ['lint']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'mocha', 'lint']);
