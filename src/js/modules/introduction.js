App.Modules.introduction = function () {
   var options = {
      el: '.js-introduction'
   };

   var init = function() {
      options.page = $(options.el);
      bindEvents();
   };

   var bindEvents =  function () {
      App.Events.subscribe('app/init', hello);
      App.Events.subscribe('app/init', render);
   };

   var hello = function() {
      console.log('caught even app/init');
   };

   var render = function() {
      options.page.html(Handlebars.templates.introduction({title: "Say my name", body: "Heisenberg!"}));
   };

   return {
      init: init
   };

}();


