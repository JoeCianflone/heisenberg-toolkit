App.Modules = App.Modules || {};
App.Modules.Introduction = function () {
   var o = { };

   var hello = function(data) {
      console.log(data.eventElement);
   };

   var world = function(data) {
      console.log("WORLD!");
   };

   var textCheck = function(data) {
      console.log("KEY");
   };

   var testMouse = function(data) {
      console.log("MOUSE");
   };
   var testMouseOut = function(data) {
      console.log("MOUSE OOOUTTT");
   };
   return {
      init: function() {
         return this;
      },
      events: function() {
         Events.bind("resize").to(world, window);
         Events.bind("click", "#footer").to(hello, this);
         Events.bind("click", "p").to(hello, this);

         Events.bind("keypress", ".js-text", [51, 13]).to(textCheck, this);

         Events.bind("mouseover", '.js-mouse-test').to(testMouse, this);
         Events.bind("mouseout", '.js-mouse-test').to(testMouseOut, this);


         return this;
      }
   };



}();

