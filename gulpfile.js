var gulp    = require('gulp'),
    wrap = require('gulp-wrap'),
    sass    = require('gulp-sass'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    declare = require('gulp-declare'),
    imagemin = require('gulp-imagemin'),
    //pngquant = require('imagemin-pngquant'),
    handlebars = require('gulp-handlebars');

var config = {
   pub: {
      js:     "./assets/js/",
      css:    "./assets/css/",
      fonts:  "./assets/fonts/",
      images: "./assets/images/"
   },
   src: {
      js:        "./src/js/",
      hbs:       "./src/js/templates/",
      sass:      "./src/sass/",
      images:    "./src/images/",
      templates: "templates.tpl"
   }
};


var scripts = {
   jquery:     ["./src/bower/jquery/dist/jquery.js"],
   modernizr:  ["./src/bower/modernizr/modernizr.js"],
   app: [
      "./src/bower/jquery-validation/dist/jquery.validate.js",
      "./src/bower/underscore/underscore.js",
      "./src/bower/handlebars/handlebars.runtime.js",
      "./src/bower/amplify/lib/amplify.js",
      config.src.js + config.src.templates,
      "./src/js/app.js",
      "./src/js/helpers/toCanonicalMonth.js",
      "./src/js/modules/introduction.js",
      "./src/js/main.js"
   ]
};

gulp.task('imagemin', function () {
    return gulp.src(config.src.images + '*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
            //use: [pngquant()]
        }))
        .pipe(gulp.dest(config.pub.images));
});


gulp.task('handlebars', function () {
    gulp.src(config.src.hbs+'*.hbs')
      .pipe(handlebars())
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
          namespace: 'Handlebars.templates',
          noRedeclare: true,
      }))
      .pipe(concat(config.src.templates))
      .pipe(gulp.dest(config.src.js));
});

gulp.task('js', ['handlebars'], function() {

   gulp.src(scripts.modernizr)
       .pipe(plumber())
       .pipe(concat("modernizr.min.js"))
       .pipe(uglify())
       .pipe(gulp.dest(config.pub.js));

   gulp.src(scripts.jquery)
       .pipe(plumber())
       .pipe(concat("jquery.min.js"))
       .pipe(uglify())
       .pipe(gulp.dest(config.pub.js));

   gulp.src(scripts.app)
       .pipe(plumber())
       .pipe(concat("app.min.js"))
       //.pipe(uglify())
       .pipe(gulp.dest(config.pub.js));
});

gulp.task('sass', function () {
   gulp.src(config.src.sass + '*.scss')
       .pipe(sass())
       .pipe(gulp.dest(config.pub.css));
});

gulp.task('watch', ['scss', 'hbs', 'imgmin'], function () {
   gulp.watch(config.src.js     + '**/*.js',   ['js']);
   gulp.watch(config.src.hbs    + '**/*.hbs',  ['handlebars']);
   gulp.watch(config.src.sass   + '**/*.scss', ['sass']);
   gulp.watch(config.src.images + '**/*.*',    ['imgmin']);
});

gulp.task('scss',    ['sass']);
gulp.task('hbs',     ['js']);
gulp.task('imgmin',  ['imagemin']);
gulp.task('default', ['hbs', 'sass', 'watch']);


