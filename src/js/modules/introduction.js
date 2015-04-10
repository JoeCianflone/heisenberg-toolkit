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

   var foo = function(data) {
      console.log('Clicked');
   }

   return {
      init: function() {
         options.page = $(options.el);

         return this;
      },
      events: function() {
         App.PubSub.subscribe('app/init', function() {
            hello();
            render();
         });

         // App.Event.bind()
         App.PubSub.subscribe('app/click/foo', function(data) {
            foo(data);
         });

         return this;
      }
   };

}();


