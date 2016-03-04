var gulp       = require('gulp'),
    notify     = require('gulp-notify'),
    plumber    = require('gulp-plumber'),
    imagemin   = require('gulp-imagemin'),
    pngquant   = require('imagemin-pngquant');
    livereload = require('gulp-livereload'),
    sprity     = require('sprity'),
    del        = require('del'),
    gulpif     = require('gulp-if'),
    svgSprite  = require('gulp-svg-sprite'),
    config     = require('../config.js');


gulp.task('minification', function () {
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

gulp.task('bitmapSprite', ['minification'], function(cb) {
  return sprity.src({
    src: config.dest.imgs + '**/*.{png,jpeg,jpg}',
    style: config.src.sass + 'sprites/_bitmapSprite.scss',
    processor: 'sass',
    split: true,
    name: 'bitmap'
  })
  .on('error', function (err) {cb();})
  .pipe(plumber({errorHandler: notify.onError("Sprity Error:\n<%= error.message %>")}))
  .pipe(gulpif('*.png', gulp.dest(config.dest.imgs), gulp.dest(config.src.sass+'sprites')))
  .pipe(livereload());
});

gulp.task('svgSprite', ['minification'], function() {
    return gulp.src("**/*.svg", {cwd: config.dest.imgs})
        .pipe(plumber({errorHandler: notify.onError("SVG Sprite Error: Error:\n<%= error.message %>")}))
        .pipe(svgSprite({
            "dest": config.dest.base,
            "mode": {
               "view": {
                  "dest": config.dest.imgs,
                  "render": {
                     "scss": {
                        "dest": "../../"+config.src.sass+"/sprites/_svgSprite.scss"
                     }
                  }
               }
            }
         }))
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});
