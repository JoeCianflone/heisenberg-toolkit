(function() {
   var App = {
      Modules: {},
      Helpers: {},
      Templates: {},
      Events: amplify, // pub/sub is being handled by Amplify

      init: function () {
         for(var x in App.Modules) {
            App.Modules[x].init();
         }

         App.Events.publish('app/init');
      }
   };

   window.App = App;
})();


