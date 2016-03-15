var gulp       = require('gulp'),
    notify     = require('gulp-notify'),
    plumber    = require('gulp-plumber'),
    imagemin   = require('gulp-imagemin'),
    pngquant   = require('imagemin-pngquant');
    livereload = require('gulp-livereload'),
    config     = require('../config.js');

gulp.task('minification', [], function () {
   return gulp.src(config.src.imgs + '**/*')
      .pipe(plumber({errorHandler: notify.onError("Image Minification Error:\n<%= error.message %>")}))
      .pipe(imagemin({
         progressive: true,
         svgoPlugins: [{removeViewBox: false}],
         use: [pngquant()]
      }))
      .pipe(gulp.dest(config.dest.imgs))
      .pipe(livereload());
});
