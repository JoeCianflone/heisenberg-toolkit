App.Events = function() {

   /**
    * [executeFunctionByName description]
    * @param  {[type]} functionName [description]
    * @param  {[type]} context      [description]
    * @return {[type]}              [description]
    */
   var executeFunctionByName = function(functionName, context) {
      var args = Array.prototype.slice.call(arguments, 2),
          namespaces = functionName.split("."),
          func = namespaces.pop();

      for (var i=0, len = namespaces.length; i < len; ++i) {
         context = context[namespaces[i]];
      }

      return context[func].apply(context, args);
   };

   return {
      /**
       * [bindTo description]
       * @param  {[type]} eventType [description]
       * @param  {[type]} element   [description]
       * @param  {[type]} pubsub    [description]
       * @param  {[type]} userFunc  [description]
       * @param  {[type]} userData  [description]
       * @return {[type]}           [description]
       */
      bindTo: function(eventType, element, pubsub, userFunc, userData) {
         this.bind(eventType, element, pubsub, userData);
         this.listen(pubsub, userFunc);
      },

      /**
       * [bind description]
       * @param  {[type]} eventType [description]
       * @param  {[type]} element   [description]
       * @param  {[type]} pubsub    [description]
       * @param  {[type]} userData  [description]
       * @return {[type]}           [description]
       */
      bind: function(eventType, element, pubsub, userData) {
         $(document).on(eventType, element, function(e) {
            App.PubSub.publish(pubsub, _.extend({
               eventElement: $(this)
            }, userData));

            e.preventDefault();
         });
      },

      /**
       * [bindOnLoad description]
       * @param  {[type]} pubsub   [description]
       * @param  {[type]} userData [description]
       * @return {[type]}          [description]
       */
      bindOnLoad: function(pubsub, userData) {
         $(document).ready(function() {
            App.PubSub.publish(pubsub, userData);
         });
      },

      /**
       * [listen description]
       * @param  {[type]} pubsub [description]
       * @param  {[type]} func   [description]
       * @return {[type]}        [description]
       */
      listen: function(pubsub, func) {
         App.PubSub.subscribe(pubsub, function(data) {
            executeFunctionByName(func, window, data)
         });
      }
   };

}();

