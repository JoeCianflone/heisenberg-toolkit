var Binder = (function() {

   var asWindowEvent = function(eo) {
      Attach.singleEvent(window, eo);
   };

   var asDocumentEvent = function(eo) {
      if (eo.selector.startsWith('#')) {
         Attach.singleEvent(document.getElementById(eo.selector.replace('#', '')), eo);
      } else if (eo.selector.startsWith('.')) {
         Attach.multipleEvents(document.querySelectorAll(eo.selector), eo);
      } else {
         Attach.multipleEvents(document.getElementsByTagName(eo.selector), eo);
      }
   };

   return {
      bindSubscription: function(eo, funcName) {
         PubSub.subscribe(eo.asEventName, function(msg, data) {
            if (Array.isArray(funcName)) {
               funcName.forEach(function(userFunc) {
                  userFunc.call(eo.context, data);
               });
               return false;
            }
            return funcName.call(eo.context, data);
         });
      },

      bindEvent: function(eo, funcName) {
         if (! eo.selector) {
            asWindowEvent(eo);
         } else {
            asDocumentEvent(eo)
         }

         this.bindSubscription(eo, funcName);
         return false;
      }
   };

}());
