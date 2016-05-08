var Attach = (function() {

   var pub = function(eo, event) {
      PubSub.publish(eo.asEventName, Utils.mergeObjects(eo.userData, {
         eventElement: event.currentTarget,
         eventTarget: event.target || event.srcElement,
         eventKey: parseInt((event.keyCode ? event.keyCode : event.which)),
         event: event
      }));
   };

   var keyEvent = function(event, eo) {
      if (eo.keyPress.length > 0) {
         eo.keyPress.forEach(function(key, i) {
            var code = parseInt((event.keyCode ? event.keyCode : event.which));
            if (code === key) {
               pub(eo, event);
            }
         });
         return false;
      }
      pub(eo, event);
   }

   var genericEvent = function(event, eo) {
      pub(eo, event);
      event.preventDefault();
   };

   return {
      singleEvent: function(item, eo) {
         item.addEventListener(eo.bindEvent, function(event) {
            if (eo.isKeyEvent) {
               keyEvent(event, eo);
               return false;
            }

            genericEvent(event, eo);
         });
      },

      multipleEvents: function(items, eo) {
         Utils.forEach(items, function(index, element) {
            Attach.singleEvent(element, eo);
         });
      }
   };
}());
