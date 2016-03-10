var Attach = (function() {

   return {
      singleEvent: function(item, eo, pd) {
         if (eo.isKeyEvent && eo.keyPress) {

         } else if (eo.isKeyEvent)
         item.addEventListener(eo.bindEvent, function(e) {
            PubSub.publish(eo.asEventName, Utils.mergeObjects(eo.userData, {
               eventElement: e.target
            }));
            if (! pd) {
               e.preventDefault();
            }
         });

      },
      multipleEvents: function(items, eo) {
         Utils.forEach(items, function(i, el) {
            Attach.singleEvent(el, eo);
         });
      }
   };

      // keyboardEvents: function(items, eo) {
      //    item.addEventListener(eo.bindEvent, function(e) {
      //       eo.keyPress.forEach(function(key, i) {
      //          if (key === e.which) {
      //             PubSub.publish(eo.asEventName, Utils.mergeObjects(eo.userData, {
      //                eventElement: e.target
      //             }));
      //          }
      //       });
      //    });
      // }
}());
