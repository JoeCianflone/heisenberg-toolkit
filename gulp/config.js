/**
 * If you pulled this down directly from Github you will need
 * to replace the {{dest}} and {{src}} with the correct
 * path to where you placed these files. You will also need
 * to update the .heisenberg file so if you run walt update
 * it knows how to correctly update your files without
 * blowing making you do a bunch of manual work
 */
var dest = {
   base:     "{{dest}}/",
   js:       "{{dest}}/js/",
   css:      "{{dest}}/css/",
   imgs:     "{{dest}}/images/",
   fonts:    "{{dest}}/fonts/",
   minify:   "{{dest}}/images/minified/"
};

var src = {
   base:      "{{src}}/",
   js:        "{{src}}/js/",
   hbs:       "{{src}}/js/templates/",
   sass:      "{{src}}/sass/",
   imgs:      "{{src}}/images/",
   bower:     "{{src}}/bower/",
   fonts:     "{{src}}/fonts/",
   templates: "templates.tpl"
};

var scripts = {
   modernizr:  [src.js + "modernizr.js"],
   user: [],
   main: [
      src.bower + "picturefill/dist/picturefill.js",
      src.bower + "handlebars/handlebars.runtime.js",
      src.bower + "PubSubJS/src/pubsub.js",
      src.bower + "ajax/dist/ajax.min.js",
      src.js    + src.templates,
      src.js    + "main.js",
      src.js    + "helpers/**/*.js",
      src.js    + "resources/**/*.js",
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
