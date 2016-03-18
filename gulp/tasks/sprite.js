var gulp       = require('gulp'),
    notify     = require('gulp-notify'),
    plumber    = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    imagemin   = require('gulp-imagemin'),
    merge      = require('merge-stream'),
    spritesmith = require('gulp.spritesmith'),
    svgSprite  = require('gulp-svg-sprite'),
    fs         = require('fs'),
    config     = require('../config.js');


gulp.task('sprite-bitmap', [], function() {

  var spriteData = gulp.src(config.dest.imgs+'tmp/**/*.png').pipe(spritesmith({
    imgName:     config.sprites.bitmap.imgName,
    imgPath:     config.sprites.bitmap.imgRelativePath,
    cssName:     config.sprites.bitmap.scssName,
    cssTemplate: config.sprites.bitmap.template
  }));

  var imgStream = spriteData.img
    .pipe(gulp.dest(config.dest.imgs));

  var cssStream = spriteData.css
    .pipe(gulp.dest(config.sprites.bitmap.scssPath));

  return merge(imgStream, cssStream);
});

gulp.task('sprite-svg', [], function() {
    return gulp.src("**/*.svg", {cwd: config.dest.imgs + "tmp/"})
        .pipe(plumber({errorHandler: notify.onError("SVG Sprite Error: Error:\n<%= error.message %>")}))
        .pipe(svgSprite({
            "mode": {
                "css": {
                    "spacing": {
                        "padding": 5
                    },
                    "dest": "./",
                    "layout": "diagonal",
                    "sprite":           config.sprites.svg.imgPath + config.sprites.svg.imgName,
                    "bust": false,
                    "render": {
                        "scss": {
                            "dest":     config.sprites.svg.scssPath + config.sprites.svg.scssName,
                            "template": config.sprites.svg.template
                        }
                    }
                }
            }
         }))
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});

gulp.task('sprite-check', [], function() {
   var f1 = config.sprites.bitmap.scssPath + config.sprites.bitmap.scssName;
   var f2 = config.sprites.svg.scssPath + config.sprites.svg.scssName;

   fs.stat(f1, function(err, stat) {
      if(err !== null) {
         fs.writeFileSync(f1, '');
      }
   });

   fs.stat(f2, function(err, stat) {
      if(err !== null) {
         fs.writeFileSync(f2, '');
      }
   });
});
