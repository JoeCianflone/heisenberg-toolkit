App.Events = function() {

   return {
      bind: function() {
         App.PubSub.publish('app/init');

         $(document).on('click', '.js-button-foo', function() {
            App.PubSub.publish('app/click/foo', {
               clickedButton: $(this)
            });
         });
      }
   };

}();


