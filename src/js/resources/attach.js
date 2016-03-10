var Attach = (function() {

   var pub = function(eo, event) {
      PubSub.publish(eo.asEventName, Utils.mergeObjects(eo.userData, {
         eventElement: event.target
      }));
   };

   return {
      singleEvent: function(item, eo) {
         if (item === window) {
            window.addEventListener(eo.bindEvent, function(event) {
               pub(eo, event);
            });
            return false;
         }

         if (eo.isKeyEvent && eo.keyPress) {
            item.addEventListener(eo.bindEvent, function(event) {
               eo.keyPress.forEach(function(key, i) {
                  var code = parseInt((event.keyCode ? event.keyCode : event.which));
                  if (code === key) {
                     pub(eo, event);
                  }
               });
            });
         } else if (eo.isKeyEvent && ! eo.keypress) {
            item.addEventListener(eo.bindEvent, function(event) {
               pub(eo, event);
            });
         } else {
            item.addEventListener(eo.bindEvent, function(event) {
               pub(eo, event);
               event.preventDefault();
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
