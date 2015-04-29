(function() {
   var App = {
      Config: {},
      Modules: {},
      Helpers: {},
      PubSub: amplify,

      init: function () {
         _.each(App.Modules, function(key, value) {
            App.Modules[value].load().events();
            console.log("Loading Module/Events: "+value);
         });
      }
   };

   window.App = App;
})();

require("./helpers/toCanonicalMonth");
App.Pubsub = amplify;

