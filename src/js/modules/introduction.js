App.Modules = App.Modules || {};

App.Modules.Introduction = function () {
   var options = {
      el: '.js-introduction'
   };

   var render = function(data) {
      options.module.html(Handlebars.templates.introduction(data));
   };

   var resizer = function(data) {
      console.log("resizer!");
   };

   var clicker = function(data) {
      console.log("CLICKER 1!!");
   };

   var clicker2 = function(data) {
      console.log("CLICKER 2!!")
   };

   return {
      init: function() {
         options.module = $(options.el);

         return this;
      },
      events: function() {
         Events.bind("click", ".js-foo-clicked").to(clicker, this);
         Events.bind("window.resize").to(resizer);
         Events.bind("key" , 13).to(clicker, this);
         Events.bind("key", ".js-foo-text", ",").to(clicker2, this);
         Events.bind("key", ".js-foo-text", 13).to(clicker2, this);
         Events.bind("load").to(render, this, {title: "Hello World", body: "Oh, hello there"});

         return this;
      }
   };

}();


