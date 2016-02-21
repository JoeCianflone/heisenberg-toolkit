var gulp       = require('gulp'),
    yargs      = require('yargs').argv,
    livereload = require('gulp-livereload'),
    config     = require('../config.js');

gulp.task('watch', function () {
   if (!yargs.noreload && !yargs.production) {
      livereload.listen();
   }

   gulp.watch(config.src.imgs + '**/*',      ['imageProcess']);
   gulp.watch(config.src.js   + '**/*.js',   ['scripts']);
   gulp.watch(config.src.hbs  + '**/*.hbs',  ['handlebars', 'scripts']);
   gulp.watch(config.src.sass + '**/*.scss', ['sass']);
});
