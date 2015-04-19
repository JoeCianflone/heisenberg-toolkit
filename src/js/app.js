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

         // PubSub events...
         App.Events.bindTo('click', '.js-foo-clicked', "app/foo/clicked", "App.Modules.introduction.hello");

      }
   };

   window.App = App;
})();


