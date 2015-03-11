/**
 * We are going to start off with some basic gulp tasks
 * you can customize these to your liking, but we want to
 * make sure that you're doing some basic things:
 * 1. compiling your Sass
 * 2. uglify your scripts
 * 3. concatenate your scripts
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    handlebars = require('gulp-compile-handlebars');

/**
 * Default configuration. If you've decided to move your files
 * to different folders it's not a problem, just change the paths
 * in here and everything will output correctly
 */
var config = {
   pub: {
      js: "./assets/js/",
      css: "./assets/css/",
      fonts: "./assets/fonts/",
      images: "./assets/images/"
   },
   src: {
      js: "./src/js/",
      sass: "./src/sass/"
   }
};

/**
 * All your scripts.  There are a bunch of different ways to do this
 * this is the way that I've found to be most convenient.
 * Scripts that you do not want compiled together, create as separate
 * objects.  If you want scripts concatenated together create an array
 *
 */
var scripts = {
   jquery:    ["./src/bower/jquery/dist/jquery.js"],
   modernizr: ["./src/bower/modernizr/modernizr.js"],
   smash: [
      "./src/bower/underscore/underscore.js",
      "./src/bower/jquery-validation/dist/jquery.validate.js",
      "./src/bower/handlebars/handlebars.js",
      "./src/js/app.js",
      "./src/js/helpers/toCanonicalMonth.js",
      "./src/js/modules/introduction.js",
      "./src/js/main.js"
   ]
};

gulp.task('sass', function () {
   gulp.src(config.src.sass + '*.scss')
       .pipe(sass())
       .pipe(gulp.dest(config.pub.css));
});

gulp.task('js', function() {

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

    gulp.src(scripts.smash)
        .pipe(plumber())
        .pipe(concat("application.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(config.pub.js));

});

gulp.task('watch', function () {
    gulp.watch(config.src.sass + '**/*.scss', ['sass']);
    gulp.watch(config.src.js + '**/*.js', ['js']);
});

gulp.task('default', ['watch']);
gulp.task('run', ['sass', 'js']);

