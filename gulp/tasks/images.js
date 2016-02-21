var gulp       = require('gulp'),
    notify     = require('gulp-notify'),
    plumber    = require('gulp-plumber'),
    imagemin   = require('gulp-imagemin'),
    pngquant   = require('imagemin-pngquant');
    livereload = require('gulp-livereload'),
    sprity     = require('sprity'),
    del        = require('del'),
    gulpif     = require('gulp-if'),
    config     = require('../config.js');


// gulp.task('imageProcess', function () {
//    return gulp.src(config.src.imgs + '**/*')
//       .pipe(plumber({errorHandler: notify.onError("Imagemin Error:\n<%= error.message %>")}))
//       .pipe(imagemin({
//          progressive: true,
//          svgoPlugins: [{removeViewBox: false}],
//          use: [pngquant()]
//       }))
//       .pipe(gulp.dest(config.dest.imgs))
//       .pipe(livereload());
// });

// gulp.task('spriteGenerator', ['imageProcess'], function(cb) {
//   return sprity.src({
//     src: config.dest.imgs + '**/*.{png,jpeg,jpg}',
//     style: config.src.sass + 'modules/_sprite.scss',
//     processor: 'sass',
//     split: true
//   })
//   .on('error', function (err) {cb();})
//   .pipe(plumber({errorHandler: notify.onError("Sprity Error:\n<%= error.message %>")}))
//   .pipe(gulpif('*.png', gulp.dest(config.dest.imgs), gulp.dest(config.src.sass+'modules')));
// });
