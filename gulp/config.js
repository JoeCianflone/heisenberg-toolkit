var folders = {
    js:        'js',
    css:       'css',
    src:       'src',
    sass:      'sass',
    imgs:      'images',
    dest:      'public/assets',
    fonts:     'public/assets/fonts',
    localFonts: 'src/fonts',
    hbs:       'src/templates',
    vendor:    'node_modules',
    templates: 'template.tpl'
};

var scripts = {
    main: [
        "./" + folders.vendor + "/handlebars/dist/handlebars.runtime.js",
        "./" + folders.vendor + "/pubsub-js/src/pubsub.js",
        //"templates.tpl",
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

exports.config = {
    folders: folders,
    scripts: scripts,
    sass: sass
};

// /**
// * If you pulled this down directly from Github you will need
// * to replace the {{dest}} and {{src}} with the correct
// * path to where you placed these files. You will also need
// * to update the .heisenberg file so if you run walt update
// * it knows how to correctly update your files without
// * blowing making you do a bunch of manual work
// */
// var dest = {
//     base:     "{{dest}}/",
//     js:       "{{dest}}/js/",
//     css:      "{{dest}}/css/",
//     imgs:     "{{dest}}/images/",
//     fonts:    "{{dest}}/fonts/",
//     minify:   "{{dest}}/images/minified/"
// };

// var src = {
//     base:      "{{src}}/",
//     js:        "{{src}}/js/",
//     hbs:       "{{src}}/js/templates/",
//     sass:      "{{src}}/sass/",
//     imgs:      "{{src}}/images/",
//     bower:     "{{src}}/bower/",
//     fonts:     "{{src}}/fonts/",
//     templates: "templates.tpl"
// };

// var scripts = {
//     user: [],
//     main: [
//     src.bower + "handlebars/handlebars.runtime.js",
//     src.bower + "PubSubJS/src/pubsub.js",
//     src.js    + src.templates,
//     src.js    + "main.js",
//     src.js    + "helpers/**/*.js",
//     src.js    + "resources/**/*.js",
//     src.js    + "modules/**/*.js"
//     ]
// };


// /**
// * Here be dragons, don't change these values unless you
// * know what you're doing otherwise you're going to
// * break the build
// */
// var sprites = {
//     svg: {
//         imgName:         "svg-sprite.svg",
//         imgPath:         dest.imgs,
//         scssName:        "_sprite-svg.scss",
//         scssPath:        src.sass+"sprites/",
//         template:        "gulp/templates/svg-sprite-template.scss",
//         imgRelativePath: "../images/svg-sprite.svg"
//     },
//     bitmap: {
//         imgName:         "sprite.png",
//         imgPath:         dest.imgs+"sprite.png",
//         scssName:        "_sprite-bitmap.scss",
//         scssPath:        src.sass+"sprites/",
//         template:        "gulp/templates/bmp-sprite-template.scss.handlebars",
//         imgRelativePath: "../images/sprite.png"
//     }
// };


// // FFS, DO NOT CHANGE THIS AT ALL
// // No, I'm serious
// module.exports = {
//     dest: dest,
//     src: src,
//     scripts: scripts,
//     sprites: sprites,
//     hasChangedPath: dest.base.startsWith("{{") || src.base.startsWith("{{") ? false : true,
// // We need to check to make sure the user has downloaded and set up their folders
// // correctly. If they still have {{src}} or {{dest}} things are going to get
// // a bit funny. This just makes sure we're all set up before calling...
// attemptRunSequence: function(fn) {
//     if (this.hasChangedPath) {
//         fn.call();
//     } else {
//         console.log("Paths have not been set correctly in Heisenberg");
//         console.log("For more information, please see https://github.com/JoeCianflone/heisenberg-toolkit/wiki/Error-Messages");
//     }
// }
// };
