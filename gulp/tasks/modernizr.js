var gulp       = require('gulp'),
    modernizr  = require('gulp-modernizr'),
    config     = require('../config.js');

gulp.task('modernizr', [], function() {
      gulp.src(config.src.bower+'modernizr/src/*.js')
         .pipe(modernizr())
         .pipe(gulp.dest(config.src.js))
});
