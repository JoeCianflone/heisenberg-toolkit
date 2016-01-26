var gulp       = require('gulp'),
    config     = require('../config.js');

gulp.task('copy', ['bower'], function () {
   gulp.src([config.src.bower +"fontawesome/fonts/fontawesome-webfont.*"])
      .pipe(gulp.dest(config.dest.fonts));
});
