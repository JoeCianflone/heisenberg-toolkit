var gulp       = require('gulp'),
    notify     = require('gulp-notify'),
    plumber    = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    imagemin   = require('gulp-imagemin'),
    merge      = require('merge-stream'),
    spritesmith = require('gulp.spritesmith'),
    svgSprite  = require('gulp-svg-sprite'),
    config     = require('../config.js');


gulp.task('sprite-bitmap', [], function() {

   // svg: {
   //    imgName:         "svg-sprite.svg",
   //    imgPath:         "assets/images/",
   //    scssName:        "_sprite-svg.scss",
   //    scssPath:        "src/sass/sprites",
   //    template:        "gulp/templates/svg-sprite-template.scss",
   //    imgRelativePath: "../images/svg-sprite.svg"
   // },
   // bitmap: {
   //    imgName:         "sprite.png",
   //    imgPath:         "assets/images/sprite.png",
   //    scssName:        "_sprite-bitmap.scss",
   //    scssPath:        "src/sass/sprites",
   //    template:        "gulp/templates/bmp-sprite-template.scss.handlebars",
   //    imgRelativePath: "../images/sprite.png"
   // }


  var spriteData = gulp.src(config.src.imgs+'**/*.png').pipe(spritesmith({
    imgName:     config.sprites.bitmap.imgName,
    imgPath:     config.sprites.bitmap.imgRelativePath,
    cssName:     config.sprites.bitmap.scssName,
    cssTemplate: config.sprites.bitmap.template
  }));

  var imgStream = spriteData.img
    .pipe(gulp.dest(config.dest.imgs));

  var cssStream = spriteData.css
    .pipe(gulp.dest(config.sprites.bitmap.scssPath));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

gulp.task('sprite-svg', [], function() {
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
                    "sprite": config.sprites.svg.imgPath + config.sprites.svg.imgName,
                    "bust": false,
                    "render": {
                        "scss": {
                            "dest": config.sprites.svg.scssPath + config.sprites.svg.scssName,
                            "template": config.sprites.svg.template
                        }
                    }
                }
            }
         }))
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});
