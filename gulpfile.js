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

var gulp       = require('gulp'),
    requireDir = require('require-dir');

requireDir('./gulp/tasks', { recurse: true });

gulp.task('boot',    ['cleaner', 'bower', 'copy', 'modernizr']);
gulp.task('compile', ['boot', 'scripts', 'imageProcess', 'sass']);
gulp.task('default', ['compile', 'watch']);
