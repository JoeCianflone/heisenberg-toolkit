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

   var resizer = function(data) {
      console.log("resizer!");
   };

   var clicker = function(data) {
      console.log("CLICKED");
   };

   var clicker2 = function(data) {
      console.log("CLICKED 2");
   };

   return {
      load: function() {
         options.module = $(options.el);

         return this;
      },
      events: function() {
         Events.bind("click", ".js-foo-clicked").to(clicker, this);
         //Events.bind("window.resize").to(resizer);
         //Events.bind("window.keyup", 13).to(clicker2, this);

         return this;
      }
   };

}();


