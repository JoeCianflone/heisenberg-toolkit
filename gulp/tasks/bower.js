var gulp       = require('gulp'),
    bower      = require('gulp-bower'),
    config     = require('../config.js');

gulp.task('bower', function() {
   bower()
      .pipe(gulp.dest(config.src.bower));
});
