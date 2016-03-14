var gulp       = require('gulp'),
    notify     = require('gulp-notify'),
    plumber    = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    del        = require('del'),
    imagemin   = require('gulp-imagemin'),
    merge      = require('merge-stream'),
    vBuffer     = require('vinyl-buffer'),
    spritesmith = require('gulp.spritesmith'),
    svgSprite  = require('gulp-svg-sprite'),
    config     = require('../config.js');


gulp.task('sprite-bitmap', [], function() {

  var spriteData = gulp.src('src/images/**/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: '_sprite-bitmap.scss',
    cssTemplate: 'gulp/templates/bmp-sprite-template.scss.handlebars'
  }));

  var imgStream = spriteData.img
    // .pipe(vBuffer())
    // .pipe(imagemin())
    .pipe(gulp.dest('assets/images/'));

  var cssStream = spriteData.css
    .pipe(gulp.dest('src/sass/sprites/'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

gulp.task('sprite-svg', ['minification'], function() {
    return gulp.src("**/*.svg", {cwd: config.src.imgs})
        .pipe(plumber({errorHandler: notify.onError("SVG Sprite Error: Error:\n<%= error.message %>")}))
        .pipe(svgSprite({
            "mode": {
                "css": {
                    "spacing": {
                        "padding": 5
                    },
                    "dest": "./",
                    "layout": "diagonal",
                    "sprite": "assets/images/svg-sprite.svg",
                    "bust": false,
                    "render": {
                        "scss": {
                            "dest": "src/sass/sprites/_sprite-svg.scss",
                            "template": "gulp/templates/svg-sprite-template.scss"
                        }
                    }
                }
            }
         }))
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});
