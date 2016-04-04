var gulp       = require('gulp'),
    install    = require('gulp-install'),
    yargs      = require('yargs').argv,
    config     = require('../config.js');

gulp.task('installer', function() {
   if (yargs.install || yargs.production) {
      return gulp.src(['./bower.json', './package.json'])
         .pipe(install());
   }
});
