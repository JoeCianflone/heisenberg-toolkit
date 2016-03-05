App.Modules = App.Modules || {};
App.Modules.Introduction = function () {
   var o = { };

   var hello = function(data) {
      console.log(data.eventElement);
   };

   return {
      init: function() {

         return this;
      },
      events: function() {
         Events.bind("click", ".foo").to(hello);
         return this;
      }
   };

}();

