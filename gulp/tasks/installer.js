var gulp       = require('gulp'),
    install    = require('gulp-install'),
    config     = require('../config.js');

gulp.task('installer', function() {
   return gulp.src(['./bower.json', './package.json'])
      .pipe(install());
});
