var gulp       = require('gulp'),
    yargs      = require('yargs').argv,
    watch      = require('gulp-watch'),
    batch      = require('gulp-batch'),
    livereload = require('gulp-livereload'),
    config     = require('../config.js');

gulp.task('watch', function () {
   if (!yargs.noreload && !yargs.production) {
      livereload.listen();
   }

   watch(config.src.js + '**/*.js', batch(function(events, done) {
      gulp.start('scripts', done);
   }));

   watch(config.src.hbs  + '**/*.hbs', batch(function(events, done) {
      gulp.start('handlebars', done);
      gulp.start('scripts', done);
   }));

   watch(config.src.sass + '**/*.scss', batch(function(events, done) {
      gulp.start('sass', done);
   }));

   watch(config.src.imgs+'**/*.{jpg,jpeg,png,svg}', batch(function(events, done) {
      gulp.start('minify', done);
   }));

   watch(config.dest.minify+'**/*.{jpg,jpeg,png,svg}', batch(function(events, done) {
      gulp.start('sprite-bitmap', done);
      gulp.start('sprite-svg', done);
   }));

});
