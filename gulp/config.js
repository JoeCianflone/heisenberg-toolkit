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
   jquery:     [src.bower +"jquery/dist/jquery.js"],
   modernizr:  [src.js    +"modernizr.js"],

   main: [
      src.bower + "jquery-validation/dist/jquery.validate.js",
      src.bower + "underscore/underscore.js",
      src.bower + "underscore.string/dist/underscore.string.js",
      src.bower + "momentjs/moment.js",
      src.bower + "handlebars/handlebars.runtime.js",
      src.bower + "amplify/lib/amplify.js",
      src.js    + src.templates,
      src.js    + "app.js",
      src.js    + "resources/**/*.js",
      src.js    + "helpers/**/*.js",
      src.js    + "transformers/**/*.js",
      src.js    + "modules/**/*.js",
      src.js    + "main.js"
   ]
};

module.exports = {
   dest: dest,
   src: src,
   scripts: scripts
};
