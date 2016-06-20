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

gulp.task('boot', function(callback) {
   config.attemptRunSequence(function() {
      runSequence('cleaner', 'installer', 'copy', 'modernizr', callback);
   });

});

gulp.task('images', function(callback) {
   config.attemptRunSequence(function() {
      runSequence('minify', 'sprite-bitmap', 'sprite-svg', callback);
   });

});

gulp.task('scss', function(callback) {
   config.attemptRunSequence(function() {
      runSequence('sass', callback);
   });

});

gulp.task('js', function(callback) {
   config.attemptRunSequence(function() {
      runSequence('handlebars', 'scripts', callback);
   });

});

gulp.task('compile', function(callback) {
   config.attemptRunSequence(function() {
      runSequence('boot', 'images', 'scss', 'js',  callback);
   });

});

gulp.task('watch', function(callback) {
   config.attemptRunSequence(function() {
      runSequence('compile', 'watcher',  callback);
   });

});

gulp.task('default', function(callback) {
   config.attemptRunSequence(function() {
      runSequence('compile', callback);
   });

});
