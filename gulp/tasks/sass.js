var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    yargs      = require('yargs').argv,
    concat     = require('gulp-concat'),
    notify     = require('gulp-notify'),
    plumber    = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    prefixer   = require('gulp-autoprefixer'),
    pngquant   = require('imagemin-pngquant'),
    config     = require('../config.js');

gulp.task('sass', ['bower', 'sprite'], function () {
   gulp.src(config.src.sass + '*.scss')
      .pipe(plumber({errorHandler: notify.onError("Sass Error:\n<%= error.message %>")}))
      .pipe(sourcemaps.init())
      .pipe(sass({
         outputStyle: yargs.production ? "compressed" : "nested"
      }))
      .pipe(prefixer({
         browsers: ['last 2 versions'],
         cascade: false,
         remove: true
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dest.css))
      .pipe(livereload());
});
