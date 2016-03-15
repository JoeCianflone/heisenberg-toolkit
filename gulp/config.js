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
   bower:     "src/bower/",
   sass:      "src/sass/",
   imgs:      "src/images/",
   fonts:     "src/fonts/",
   templates: "templates.tpl"
};

var scripts = {
   modernizr:  [src.js    +"modernizr.js"],

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
   scripts: scripts
};
