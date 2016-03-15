var gulp       = require('gulp'),
    gulpif     = require('gulp-if'),
    wrap       = require('gulp-wrap'),
    yargs      = require('yargs').argv,
    concat     = require('gulp-concat'),
    notify     = require('gulp-notify'),
    uglify     = require('gulp-uglify'),
    plumber    = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    config     = require('../config.js');

gulp.task('scripts', [], function() {
   gulp.src(config.scripts.modernizr)
      .pipe(plumber({errorHandler: notify.onError("JS Error:\n<%= error.message %>")}))
      .pipe(concat("modernizr.min.js"))
      .pipe(gulpif(yargs.production, uglify()))
      .pipe(gulp.dest(config.dest.js))
      .pipe(livereload());

   gulp.src(config.scripts.main)
      .pipe(plumber({errorHandler: notify.onError("JS Error:\n<%= error.message %>")}))
      .pipe(sourcemaps.init())
         .pipe(concat("app.min.js"))
         .pipe(gulpif(yargs.production, uglify()))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(config.dest.js))
      .pipe(livereload());
});
