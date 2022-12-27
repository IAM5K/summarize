var gulp = require('gulp');
var gzip = require('gulp-gzip');

gulp.task('compress', function() {
  return gulp.src(['./www/**/*.*'])
      .pipe(gzip())
      .pipe(gulp.dest('./www'));
});
