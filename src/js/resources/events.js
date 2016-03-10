var Events = (function() {
   // eventObject
   var eo = {};

   return {

      bind: function(bindEvent, selector, key) {
         eo.bindEvent  = bindEvent;
         eo.selector   = ! selector ? false : selector;
         eo.keyPress   = ! key ? false : key;
         eo.isKeyEvent = eo.bindEvent.startsWith("key") ? true : false;

         // Basically we're checking to see if the user is trying to
         // globally capture some keystrokes, this is probably a
         // pretty rare thing, so instead of making the tirnary
         // operator crazy to read we just add an if after
         if (Array.isArray(eo.selector)) {
            eo.keyPress = eo.selector;
            eo.selector = false;
         }

         return this;
      },

      to: function(funcName, context, userData) {
         eo.asEventName = Utils.generateEventName();
         eo.userData    = ! userData ? {} : userData;
         eo.context     = ! context ? window : context;

         Binder.bindEvent(eo, funcName);

         eo = {};
         return eo;
      },

      publish: function(eventName, userData) {
         PubSub.publish(eventName, userData);
      },

      subscribe: function(eventName, funcName, context) {
         PubSub.subscribe(eventName, function(data) {
            return funcName.call(context, data);
         });
      }
   };
}());
