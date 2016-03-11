App.Modules = App.Modules || {};
App.Modules.Introduction = function () {
   var o = { };

   var hello = function(data) {

   };

   return {
      init: function() { return this; },
      events: function() {
         Events.when("body[class]==bodyFoo").bind("click", ".js-foo").to(hello, this);
         return this;
      }
   };
}();

