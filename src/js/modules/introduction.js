App.Modules = App.Modules || {};
App.Modules.Introduction = function () {
   var options = {
      el: '.js-introduction'
   };

   return {
      init: function() {
         options.module = $(options.el);

         return this;
      },
      events: function() {

         return this;
      }
   };

}();


