App.Modules.introduction = function () {
   var options = {
      el: '.js-introduction'
   };

   var hello = function() {
      $('.js-date').html(moment().year());
   };

   var render = function() {
      options.page.html(Handlebars.templates.introduction({title: "Say my name", body: "Heisenberg!"}));
   };

   return {
      init: function() { options.page = $(options.el); return this; },
      events: function() { return this; },

      hello: function(data) {
         console.log("hello intro");
         console.log(data);
      }
   };

}();


