var gulp       = require('gulp'),
    del        = require('del'),
    config     = require('../config.js');

gulp.task('cleaner', [], function () {
   del([
      config.dest.css   + "**/*.*",
      config.dest.js    + "**/*.*",
      config.dest.imgs  + "**/*.*",
      config.dest.fonts + "**/*.*",
      config.src.scss + "sprites/**/*.*"
   ]);
});
