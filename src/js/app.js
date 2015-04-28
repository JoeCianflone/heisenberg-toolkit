(function() {
   var App = {
      Config: {},
      Modules: {},
      Helpers: {},
      PubSub: amplify,

      init: function () {
         _.each(App.Modules, function(key, value) {
            App.Modules[value].init().events();
            console.log("Loading Module/Events: "+value);
         });

         Events.bind("window.resize").to(App.Modules.introduction.resizer, this);
      }
   };

   window.App = App;
})();


