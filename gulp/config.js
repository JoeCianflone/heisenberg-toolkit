var dest = {
   base:     "assets/",
   js:       "assets/js/",
   css:      "assets/css/",
   imgs:     "assets/images/",
   fonts:    "assets/fonts/",
   minify:   "assets/images/minified/"
};

var src = {
   base:      "src/",
   js:        "src/js/",
   hbs:       "src/js/templates/",
   sass:      "src/sass/",
   imgs:      "src/images/",
   bower:     "src/bower/",
   fonts:     "src/fonts/",
   templates: "templates.tpl"
};

var scripts = {
   modernizr:  [src.js + "modernizr.js"],

   main: [
      // Your files go here...literally right here above all the rest
      // Note: you don't need to add any modules in here this is
      // just for new plugins or things you might bring into
      // the project
      src.bower + "handlebars/handlebars.runtime.js",
      src.bower + "PubSubJS/src/pubsub.js",
      src.bower + "ajax/dist/ajax.min.js",
      src.js    + src.templates,
      src.js    + "main.js",
      src.js    + "resources/**/*.js",
      src.js    + "helpers/**/*.js",
      src.js    + "transformers/**/*.js",
      src.js    + "modules/**/*.js"
   ]
};


/**
 * Here be dragons, don't change these values unless you
 * know what you're doing otherwise you're going to
 * break the build
 */
var sprites = {
   svg: {
      imgName:         "svg-sprite.svg",
      imgPath:         dest.imgs,
      scssName:        "_sprite-svg.scss",
      scssPath:        src.sass+"sprites/",
      template:        "gulp/templates/svg-sprite-template.scss",
      imgRelativePath: "../images/svg-sprite.svg"
   },
   bitmap: {
      imgName:         "sprite.png",
      imgPath:         dest.imgs+"sprite.png",
      scssName:        "_sprite-bitmap.scss",
      scssPath:        src.sass+"sprites/",
      template:        "gulp/templates/bmp-sprite-template.scss.handlebars",
      imgRelativePath: "../images/sprite.png"
   }
};


// FFS, DO NOT CHANGE THIS AT ALL
// No, I'm serious
module.exports = {
   dest: dest,
   src: src,
   scripts: scripts,
   sprites: sprites
};
