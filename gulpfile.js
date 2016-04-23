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

var gulp        = require('gulp'),
    config      = require('./gulp/config.js'),
    requireDir  = require('require-dir'),
    runSequence = require('run-sequence');

requireDir('./gulp/tasks', { recurse: true });

var foldersSetUpCorrect = function() {
   if (!config.dest.base.startsWith("{{dest}}") && !config.src.base.startsWith("{{src}}")) {
      return true;
   }

   console.log("Unable to run this gulp task because your directories are not set up correctly...");
   console.log("For more information, please see https://github.com/JoeCianflone/heisenberg-toolkit/wiki/Error-Messages for more information");
   return false;
};

gulp.task('boot', function(callback) {
   if (foldersSetUpCorrect()) {
      runSequence('cleaner', 'installer', 'copy', 'modernizr', callback);
   }
});

gulp.task('images', function(callback) {
   if (foldersSetUpCorrect()) {
      runSequence('minify', 'sprite-bitmap', 'sprite-svg', callback);
   }
});

gulp.task('scss', function(callback) {
   if (foldersSetUpCorrect()) {
      runSequence('sass', callback);
   }
});

gulp.task('js', function(callback) {
   if (foldersSetUpCorrect()) {
      runSequence('handlebars', 'scripts', callback);
   }
});

gulp.task('compile', function(callback) {
   if (foldersSetUpCorrect()) {
      runSequence('boot', 'images', 'scss', 'js',  callback);
   }
});

gulp.task('watch', function(callback) {
   if (foldersSetUpCorrect()) {
      runSequence('compile', 'watcher',  callback);
   }
});

gulp.task('default', function(callback) {
   if (foldersSetUpCorrect()) {
      runSequence('compile', callback);
   }
});
