(function() {
   var App = {
      init: function () {
         _.each(App.Modules, function(key, value) {
            App.Modules[value].init().events();
            console.log("Module/Events: "+value);
         });
      }
   };

   window.App = App;
})();



