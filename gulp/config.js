var dest = {
   base:   "assets/",
   js:     "assets/js/",
   css:    "assets/css/",
   imgs:   "assets/images/",
   fonts:  "assets/fonts/",
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

// TODO: need to add some documentation on how to change this, its a bit involved...
var sprites = {
   svg: {
      imgName:         "svg-sprite.svg",
      imgPath:         "assets/images/",
      scssName:        "_sprite-svg.scss",
      scssPath:        "src/sass/sprites/",
      template:        "gulp/templates/svg-sprite-template.scss",
      imgRelativePath: "../images/svg-sprite.svg"
   },
   bitmap: {
      imgName:         "sprite.png",
      imgPath:         "assets/images/sprite.png",
      scssName:        "_sprite-bitmap.scss",
      scssPath:        "src/sass/sprites/",
      template:        "gulp/templates/bmp-sprite-template.scss.handlebars",
      imgRelativePath: "../images/sprite.png"
   }
};

var scripts = {
   modernizr:  [src.js + "modernizr.js"],

   main: [
      // Your files go here...
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

module.exports = {
   dest: dest,
   src: src,
   scripts: scripts,
   sprites: sprites
};
