/**
 * Heisenberg Toolkit Gulpfile
 *
 * USAGE local:
 * gulp
 *
 * USAGE production:
 * gulp --production
 *
 * In production heisenberg will uglify your JS and minify your SASS and
 * obviously not turn on live reload
 *
 * Live Reload is turned on by default, if you DO NOT want to use it:
 * gulp --noreload
 * - or -
 * gulp --production
 *
 * Chrome Plugin:
 * https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en
 *
 * Firefox Plugin:
 * https://addons.mozilla.org/en-us/firefox/addon/livereload/
 */

/**
 * Why don't I use gulp-load-plugins here?  Wouldn't that make
 * this easier? Sure, except for the fact that the plugin list
 * then becomes a black box.  Personally, I don't like that
 * plugin because it forces me to have to look in a different file
 * to find out if you have a specific plugin and I'm lazy.
 *
 */
var gulp       = require('gulp'),
    gulpif     = require('gulp-if'),
    wrap       = require('gulp-wrap'),
    sass       = require('gulp-sass'),
    yargs      = require('yargs').argv
    concat     = require('gulp-concat'),
    notify     = require('gulp-notify'),
    uglify     = require('gulp-uglify'),
    plumber    = require('gulp-plumber'),
    declare    = require('gulp-declare'),
    imagemin   = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    handlebars = require('gulp-handlebars'),
    livereload = require('gulp-livereload'),
    prefixer   = require('gulp-autoprefixer'),
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
      "./src/bower/handlebars/handlebars.runtime.js", // You only need the handlebars runtime because we compile all our templates
      "./src/bower/amplify/lib/amplify.js",
      config.src.js + config.src.templates,
      "./src/js/app.js",
      "./src/js/helpers/toCanonicalMonth.js",
      "./src/js/modules/introduction.js",
      "./src/js/main.js"
   ]
};

// Copy fonts to public fonts folder ..........................................
gulp.task('fonts', function () {
    return gulp.src(['./src/bower/fontawesome/fonts/fontawesome-webfont.*'])
         .pipe(gulp.dest(config.pub.fonts));
});

// Minify images ..............................................................
gulp.task('imagemin', function () {
    return gulp.src(config.src.images + '*')
        .pipe(plumber({errorHandler: notify.onError("Imagemin Error:\n<%= error.message %>")}))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.pub.images))
        .pipe(livereload());
});

// Compile handlebars templates ...............................................
gulp.task('handlebars', function () {
    gulp.src(config.src.hbs+'*.hbs')
      .pipe(plumber({errorHandler: notify.onError("Handlebars Error:\n<%= error.message %>")}))
      .pipe(handlebars())
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
          namespace: 'Handlebars.templates',
          noRedeclare: true,
      }))
      .pipe(concat(config.src.templates))
      .pipe(gulp.dest(config.src.js))
      .pipe(livereload());
});

// Do everything to JavaScript ................................................
gulp.task('js', ['handlebars'], function() {
   gulp.src(scripts.modernizr)
       .pipe(plumber({errorHandler: notify.onError("JS Error:\n<%= error.message %>")}))
       .pipe(concat("modernizr.min.js"))
       .pipe(gulpif(yargs.production, uglify()))
       .pipe(gulp.dest(config.pub.js))
       .pipe(livereload());

   gulp.src(scripts.jquery)
       .pipe(plumber({errorHandler: notify.onError("JS Error:\n<%= error.message %>")}))
       .pipe(concat("jquery.min.js"))
       .pipe(gulpif(yargs.production, uglify()))
       .pipe(gulp.dest(config.pub.js))
       .pipe(livereload());

   gulp.src(scripts.app)
       .pipe(plumber({errorHandler: notify.onError("JS Error:\n<%= error.message %>")}))
       .pipe(sourcemaps.init())
          .pipe(concat("app.min.js"))
          .pipe(gulpif(yargs.production, uglify()))
       .pipe(sourcemaps.write("./maps"))
       .pipe(gulp.dest(config.pub.js))
       .pipe(livereload());
});

// Compile the Sass ...........................................................
gulp.task('sass', function () {
   gulp.src(config.src.sass + '*.scss')
       .pipe(plumber({errorHandler: notify.onError("Sass Error:\n<%= error.message %>")}))
       .pipe(sourcemaps.init())
          .pipe(sass({
             outputStyle: yargs.production ? "compressed" : "nested"
          }))
          .pipe(prefixer())
       .pipe(sourcemaps.write("./maps"))
       .pipe(gulp.dest(config.pub.css))
       .pipe(livereload());
});

// Watch for changes ..........................................................
gulp.task('watch', function () {
   if (!yargs.noreload && !yargs.production) {
      livereload.listen();
   }
   gulp.watch(config.src.js     + '**/*.js',   ['js']);
   gulp.watch(config.src.hbs    + '**/*.hbs',  ['handlebars']);
   gulp.watch(config.src.sass   + '**/*.scss', ['sass']);
   gulp.watch(config.src.images + '**/*.*',    ['imagemin']);
});

gulp.task('default', ['fonts', 'js', 'sass', 'imagemin','watch']);


