App.Modules = App.Modules || {};
App.Modules.Introduction = function () {
   var o = { };

   var hello = function(data) {
      console.log("HELLO");
   };

   var world = function(data) {
      console.log(data);
   };

   return {
      init: function() { return this; },
      events: function() {
         Events.bind("click", ".js-mouse-test").to(hello, this);
         Events.bind("keypress").to(world, this);
         return this;
      }
   };
}();

