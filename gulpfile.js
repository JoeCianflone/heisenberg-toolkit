var gulp = require('gulp'),
    sass = require('gulp-sass'),
    shell = require('gulp-shell'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber');

var config = {
   pub: {
      js:     "./assets/js/",
      css:    "./assets/css/",
      fonts:  "./assets/fonts/",
      images: "./assets/images/"
   },
   src: {
      js:   "./src/js/",
      hbs:  "./src/js/templates/",
      sass: "./src/sass/",
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
      "./src/js/templates.hbs",
      "./src/js/app.js",
      "./src/js/helpers/toCanonicalMonth.js",
      "./src/js/modules/introduction.js",
      "./src/js/main.js"
   ]
};

/**
 * gulp-handlebars sucks so I'm just using the shell to execute the
 * handlebars command
 *
 * Note: this is a half-step and it creates a file called templates.hbs
 * why an hbs instead of handlebars or js?  Good question.  We write this
 * file to the src/js directory which is being watched by gulp so if I wrote
 * a .handlebars or .js file into that directory you'd get stuck in an
 * infinate loop because it would see a file being written to and changed.
 *
 * Trust me on this one.
 */
gulp.task('handlebars', function () {
  gulp.src(config.src.hbs, {read: false})
      .pipe(shell('handlebars  <%= file.path %> -f src/js/templates.hbs -k each -k if -k unless'));
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
        .pipe(uglify())
        .pipe(gulp.dest(config.pub.js));

});

gulp.task('sass', function () {
   gulp.src(config.src.sass + '*.scss')
       .pipe(sass())
       .pipe(gulp.dest(config.pub.css));
});

gulp.task('watch', function () {
    gulp.watch(config.src.sass + '**/*.scss', ['sass']);
    gulp.watch(config.src.js + '**/*.js', ['js']);
    gulp.watch(config.src.js + '**/*.handlebars', ['hbs']);
});

gulp.task('default', ['hbs', 'sass', 'watch']);
gulp.task('scss', ['sass']);
gulp.task('hbs', ['handlebars', 'js']);


