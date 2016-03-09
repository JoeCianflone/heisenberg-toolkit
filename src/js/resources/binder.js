var Binder = (function() {

   var asWindowEvent = function(eo) {
      window.addEventListener(eo.bindEvent, function(e) {
         PubSub.publish(eo.asEventName, Utils.mergeObjects(eo.userData, {
            eventElement: e.target
         }));
      });
   };

   var asDocumentEvent = function(eo) {
      if (eo.selector.startsWith('#')) {
         attachSingleEvent(document.getElementById(eo.selector.replace('#', '')), eo);
      } else if (eo.selector.startsWith('.')) {
         attachMultipleEvents(document.querySelectorAll(eo.selector), eo);
      } else {
         attachMultipleEvents(document.getElementsByTagName(eo.selector), eo);
      }
   };

   var attachSingleEvent = function(item, eo) {
      if (! eo.keyPress) {
         item.addEventListener(eo.bindEvent, function(e) {
            PubSub.publish(eo.asEventName, Utils.mergeObjects(eo.userData, {
               eventElement: e.target
            }));
            e.preventDefault();
         });

         return false;
      }

         item.addEventListener(eo.bindEvent, function(e) {
            eo.keyPress.forEach(function(key, i) {
               if (key === e.which) {
                  PubSub.publish(eo.asEventName, Utils.mergeObjects(eo.userData, {
                     eventElement: e.target
                  }));
               }
            })

         });

   };

   var attachMultipleEvents = function(items, eo) {
      Utils.forEach(items, function(i, el) {
         attachSingleEvent(el, eo);
      });
   };

   return {
      bindSubscription: function(eo, funcName   ) {
         PubSub.subscribe(eo.asEventName, function(data) {
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
   //    asKeyboard: function(eo) {
   //       var keyType = (eo.bindEvent === "key" || eo.bindEvent === "keydown") ? "keydown" : eo.bindEvent;
   //       $(document).on(keyType, eo.selector, function(e) {
   //          var charCode = (e.which ? e.which : e.keyCode);
   //          _.each(eo.keyPress, function(element, index, list){
   //             if (element === charCode) {
   //                PubSub.publish(eo.asEventName, _.extend({
   //                   eventElement: $(eo.selector +":focus") || null
   //                }, eo.userData));
   //             }
   //          });
   //       });
   //    },

   //    asTyping: function(eo) {
   //       $(document).on("keyup", eo.selector, function(e) {
   //          PubSub.publish(eo.asEventName, _.extend({
   //             eventElement: $(eo.selector +":focus") || null
   //          }, eo.userData));
   //       });
   //    },
}());
