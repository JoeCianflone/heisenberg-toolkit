App.Modules = App.Modules || {};
App.Modules.Introduction = function () {
   var o = { };

   var hello = function(data) {
      console.log("HELLO");
   };

   return {
      init: function() { return this; },
      events: function() {
         Events.bind("click", ".js-mouse-test").to(hello, this);

         return this;
      }
   };
}();

