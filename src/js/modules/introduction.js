App.Modules.introduction = function () {
   var options = {
      el: '.js-introduction'
   };

   var hello = function() {
      $('.js-date').html(moment().year());
   };

   var render = function() {
      options.module.html(Handlebars.templates.introduction({title: "Say my name", body: "Heisenberg!"}));
   };

   var clicker = function(data) {
      console.log("CLICKED");
   }

   var clicker2 = function(data) {
      console.log("CLICKED 2");
   };

   return {
      init: function() {
         options.module = $(options.el);

         return this;
      },
      events: function() {

         App.Events.bind("load").to("app/init").andCall([
            "App.Modules.introduction.render",
            "App.Modules.introduction.hello"
         ]);

         return this;
      },
      render: render,
      hello: hello
   };

}();


