/**
 * Heisenberg Reborn Gulpfile
 *
 * USAGE local:
 * gulp
 *
 * USAGE production:
 * gulp --production
 *
 * In production heisenberg will uglify your JS and minify your SASS
 */
var gulp       = require('gulp'),
    gulpif     = require('gulp-if'),
    wrap       = require('gulp-wrap'),
    sass       = require('gulp-sass'),
    yargs      = require('yargs').argv
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    plumber    = require('gulp-plumber'),
    declare    = require('gulp-declare'),
    imagemin   = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    handlebars = require('gulp-handlebars'),
    pngquant   = require('imagemin-pngquant');

/**
 * Configuration object
 * Various folders that Gulp is going to need to know about.
 * Feel free to move all this stuff around, just make sure you
 * keep this file up-to-date
 */
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
      // When you crate a new image you should put them in the SRC directory
      // from there imagemin will see it and compress the image and copy the
      // image into the /assets/images folder where you can call it.
      images:    "./src/images/",
      // when handlebars compiles all your scripts together, it needs a place to put them.
      // it goes into this .tpl file before getting compiled into the main JS file.
      // Why .tpl? If you name it .js then the gulp watcher goes crazy because it sees
      // you writing a new JS file.
      templates: "templates.tpl"
   }
};

/**
 * Scripts object-array
 * These are the various JS scripts that are being used in the site.
 * There are a couple of things going on here so let's take a look
 */
var scripts = {
   // jQuery and Modernizr should not be concatenated with everything else
   // Why? Modernizer needs to be in the <head> and jQuery only needs to be
   // loaded IF the google CDN version fails to load
   jquery:     ["./src/bower/jquery/dist/jquery.js"],
   modernizr:  ["./src/bower/modernizr/modernizr.js"],

   // All these scripts will be concatenated together and the order is important
   app: [
      "./src/bower/jquery-validation/dist/jquery.validate.js",
      "./src/bower/underscore/underscore.js",
      // You only need the handlebars runtime because we compile all our templates
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
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
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
       .pipe(gulpif(yargs.production, uglify()))
       .pipe(gulp.dest(config.pub.js));

   gulp.src(scripts.jquery)
       .pipe(plumber())
       .pipe(concat("jquery.min.js"))
       .pipe(gulpif(yargs.production, uglify()))
       .pipe(gulp.dest(config.pub.js));

   gulp.src(scripts.app)
       .pipe(plumber())
       .pipe(sourcemaps.init())
          .pipe(concat("app.min.js"))
          .pipe(gulpif(yargs.production, uglify()))
       .pipe(sourcemaps.write("./maps"))
       .pipe(gulp.dest(config.pub.js));
});

gulp.task('sass', function () {
   gulp.src(config.src.sass + '*.scss')
       .pipe(plumber())
       .pipe(sourcemaps.init())
          .pipe(sass({
             outputStyle: yargs.production ? "compressed" : "nested"
          }))
       .pipe(sourcemaps.write("./maps"))
       .pipe(gulp.dest(config.pub.css));
});

gulp.task('watch', function () {
   gulp.watch(config.src.js     + '**/*.js',   ['js']);
   gulp.watch(config.src.hbs    + '**/*.hbs',  ['handlebars']);
   gulp.watch(config.src.sass   + '**/*.scss', ['sass']);
   gulp.watch(config.src.images + '**/*.*',    ['imgmin']);
});

gulp.task('default', ['js', 'sass', 'imagemin','watch']);


