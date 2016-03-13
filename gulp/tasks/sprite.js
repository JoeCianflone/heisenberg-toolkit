var gulp       = require('gulp'),
    notify     = require('gulp-notify'),
    plumber    = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    del        = require('del'),
    imagemin   = require('gulp-imagemin'),
    merge      = require('merge-stream'),
    vBuffer     = require('vinyl-buffer'),
    spritesmith = require('gulp.spritesmith'),
    config     = require('../config.js');


gulp.task('sprite-bitmap', [], function() {

  var spriteData = gulp.src('src/images/**/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: '_sprite-bitmap.scss'
  }));

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // // DEV: We must buffer our stream into a Buffer for `imagemin`
    // .pipe(vBuffer())
    // .pipe(imagemin())
    .pipe(gulp.dest('assets/images/'));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(gulp.dest('src/sass/sprites/'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

gulp.task('sprite-svg', ['minification'], function() {
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
