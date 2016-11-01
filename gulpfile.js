var hConfig = require('./gulp/config.js').config;
var elixir = require('laravel-elixir');

require('laravel-elixir-imagemin');
require('laravel-elixir-del');

/**
 * ............................................................................
 * Update the paths in Elixir so we don't have to pass the config variable into
 * the various mixes
 * ............................................................................
 */
elixir.config.sourcemaps      = true;
elixir.config.assetsPath      = hConfig.folders.src;
elixir.config.publicPath      = hConfig.folders.dest;
elixir.config.css.sass.folder = hConfig.folders.sass;
elixir.config.js.folder       = hConfig.folders.js;
elixir.config.js.outputFolder = hConfig.folders.js;
elixir.config.images = {
    folder:       hConfig.folders.imgs,
    outputFolder: hConfig.folders.imgs
};

var fontAwesome = "./"+ hConfig.folders.vendor + '/font-awesome/fonts';

elixir(function(mix) {
    mix
        .del(hConfig.folders.dest)
        .copy(hConfig.folders.localFonts, hConfig.folders.fonts)
        .copy(fontAwesome, hConfig.folders.fonts)
        .sass(hConfig.sass.main)
        .scripts(hConfig.scripts.main)
        .imagemin();
});


