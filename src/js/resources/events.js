var Events = (function() {
   // eventObject
   var eo = {};

   return {
      when: function(contextString) {
         var isEqualTo    = contextString.indexOf("==") > 0 ? true : false,
             contextArray = (isEqualTo) ? contextString.split("==") : contextString.split("!="),
             tag          = contextArray[0].substring(0, contextArray[0].indexOf("[")),
             attribute    = contextArray[0].match(/\[(.*?)\]/)[1];

         if (isEqualTo) {
            eo.when = document.getElementsByTagName(tag)[0].getAttribute(attribute) === contextArray[1]
         } else {
            eo.when = document.getElementsByTagName(tag)[0].getAttribute(attribute) !== contextArray[1]
         }

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

      to: function(funcName, context, userData) {
         eo.asEventName = Utils.generateEventName();
         eo.userData    = ! userData ? {} : userData;
         eo.context     = ! context ? window : context;

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
