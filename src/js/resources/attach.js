var Attach = (function() {

   var pub = function(eo, event) {
      PubSub.publish(eo.asEventName, Utils.mergeObjects(eo.userData, {
         eventElement: event.target || event.srcElement
      }));
   };

   var specificKeyEvent = function(event, eo) {
      eo.keyPress.forEach(function(key, i) {
         var code = parseInt((event.keyCode ? event.keyCode : event.which));
         if (code === key) {
            pub(eo, event);
         }
      });
   };

   var typingEvent = function(event, eo) {
      pub(eo, event);
   };

   var genericEvent = function(event, eo) {
      pub(eo, event);
      event.preventDefault();
   };

   return {
      singleEvent: function(item, eo) {
         if (item === window) {
            if (eo.isKeyEvent && eo.keyPress) {
               window.addEventListener(eo.bindEvent, function(event) {
                  specificKeyEvent(event, eo);
               });
            } else if (eo.isKeyEvent && ! eo.keypress) {
               window.addEventListener(eo.bindEvent, function(event) {
                  typingEvent(event, eo);
               });
            } else {
               item.addEventListener(eo.bindEvent, function(event) {
                  genericEvent(event, eo);
               });
            }

            return false;
         }

         if (eo.isKeyEvent && eo.keyPress) {
            item.addEventListener(eo.bindEvent, function(event) {
               specificKeyEvent(event, eo);
            });
         } else if (eo.isKeyEvent && ! eo.keypress) {
            item.addEventListener(eo.bindEvent, function(event) {
               typingEvent(event, eo);
            });
         } else {
            item.addEventListener(eo.bindEvent, function(event) {
               genericEvent(event, eo);
            });
         }
      },
      multipleEvents: function(items, eo) {
         Utils.forEach(items, function(index, element) {
            Attach.singleEvent(element, eo);
         });
      }
   };
}());
