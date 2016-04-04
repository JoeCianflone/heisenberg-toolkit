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
    requireDir  = require('require-dir');
    runSequence = require('run-sequence');

requireDir('./gulp/tasks', { recurse: true });

gulp.task('boot', function(callback) {
   runSequence('cleaner', 'installer', 'copy', 'modernizr', callback);
});

gulp.task('images', function(callback) {
   runSequence('minify', 'sprite-bitmap', 'sprite-svg', callback);
});

gulp.task('css', function(callback) {
   runSequence('sass', callback);
});

gulp.task('js', function(callback) {
   runSequence('handlebars', 'scripts', callback);
});

gulp.task('compile', function(callback) {
   runSequence('boot', 'images', 'css', 'js',  callback);
});

gulp.task('default', function(callback) {
   runSequence('compile', 'watch', callback);
});
