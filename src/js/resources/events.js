var Events = (function() {
   // eventObject
   var eo = {};

   return {
      when: function(contextString) {
         eo.when = !!document.querySelector(contextString);

         return this;
      },

      bind: function(bindEvent, selector, key) {
         eo.when       = typeof eo.when == 'undefined' ? true : eo.when;
         eo.bindEvent  = bindEvent;
         eo.selector   = ! selector ? false : selector;
         eo.keyPress   = ! key ? false : key;
         eo.isKeyEvent = eo.bindEvent.startsWith("key") ? true : false;

         if (Array.isArray(selector)) {
            eo.selector = false;
            eo.keyPress = selector;
         }

         return this;
      },

      to: function(funcName, context, userData, prevent) {
         eo.asEventName = Utils.generateEventName();

         eo.context  = ! context ? window : context;
         eo.userData  = ! userData ? {} : userData;
         eo.prevent  = typeof prevent === "undefined" ? true : prevent;

         if (eo.when) {
            Binder.bindEvent(eo, funcName);
         }

         // Once you've done the bindEvent
         // clear the eventObject
         eo = {};
         return eo;
      },

      publish: function(eventName, userData) {
         PubSub.publish(eventName, userData);
      },

      subscribe: function(eventName, funcName, context) {
         PubSub.subscribe(eventName, function(msg, data) {
            return funcName.call(context, data);
         });
      }
   };
}());
