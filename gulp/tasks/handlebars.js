var gulp       = require('gulp'),
    notify     = require('gulp-notify'),
    declare    = require('gulp-declare'),
    plumber    = require('gulp-plumber'),
    wrap       = require('gulp-wrap'),
    concat     = require('gulp-concat'),
    handlebars = require('gulp-handlebars'),
    livereload = require('gulp-livereload'),
    config     = require('../config.js');

gulp.task('handlebars', [], function () {
   return gulp.src(config.src.hbs+'*.hbs')
      .pipe(plumber({errorHandler: notify.onError("Handlebars Error:\n<%= error.message %>")}))
      .pipe(handlebars({
         handlebars: require('handlebars')
      }))
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
         namespace: 'Handlebars.templates',
         noRedeclare: true,
      }))
      .pipe(concat(config.src.templates))
      .pipe(gulp.dest(config.src.js))
      .pipe(livereload());
});
