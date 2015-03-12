(function() {
   var App = {

      Modules: {},

      Helpers: {},

      // We're using AmplifyJS for pub/sub
      Events: amplify,

      init: function () {

         for(var x in App.Modules) {
            App.Modules[x].init();
         }

         App.Events.publish('app/init');
      }
   };

   window.App = App;
})();


