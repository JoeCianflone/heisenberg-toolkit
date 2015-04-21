(function() {
   var App = {
      Config: {},
      Modules: {},
      Helpers: {},
      Events: {},
      PubSub: amplify, // pub/sub is being handled by Amplify

      init: function () {
         _.each(App.Modules, function(key, value) {
            App.Modules[value].init().events();

            console.log("Loading Module/Events: "+value);
         });

      }
   };

   window.App = App;
})();


