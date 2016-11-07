var elixir = require('laravel-elixir');
require('laravel-elixir-imagemin');
require('laravel-elixir-del');

var folders = {
    js:        'js',
    css:       'css',
    src:       '{{src}}',
    sass:      'sass',
    imgs:      'images',
    dest:      '{{dest}}',
    fonts:     '{{dest}}/fonts',
    localFonts: '{{src}}/fonts',
    vendor:    './node_modules',
};

var vendor = {
    fontAwesome: folders.vendor + '/font-awesome/fonts'
};

var scripts = {
    main: [
        folders.vendor + "/pubsub-js/src/pubsub.js",
        "main.js",
        "helpers/**/*.js",
        "resources/**/*.js",
        "modules/**/*.js"
    ]
};

var sass = {
    main: [
        "application.scss"
    ]
};

/**
 * ............................................................................
 * Update the paths in Elixir so we don't have to pass the config variable into
 * the various mixes
 * ............................................................................
 */
elixir.config.sourcemaps      = true;
elixir.config.assetsPath      = folders.src;
elixir.config.publicPath      = folders.dest;
elixir.config.css.sass.folder = folders.sass;
elixir.config.js.folder       = folders.js;
elixir.config.js.outputFolder = folders.js;
elixir.config.images = {
    folder:       folders.imgs,
    outputFolder: folders.imgs
};

elixir(function(mix) {
    mix.del(folders.dest, {useSync: true, force: true})
       .copy(folders.localFonts, folders.fonts)
       .copy(vendor.fontAwesome, folders.fonts)
       .sass(sass.main)
       .scripts(scripts.main)
       .imagemin();
});
