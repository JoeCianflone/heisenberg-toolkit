App.Events = function() {

   var listenFor = function(eventName, userFunction) {
      App.PubSub.subscribe(eventName, function(data) {
         if (_.isArray(userFunction)) {
            _.each(userFunction, function(userFunc) {
               executeFunctionByName(userFunc, window, data);
            });

            return false;
         }
         executeFunctionByName(userFunction, window, data);
      });
   };

   var bindToDocument = function(eventType, selector, eventName, userData) {
      $(document).on(eventType, selector, function(e) {
         App.PubSub.publish(eventName, _.extend({
            eventElement: $(this)
         }, userData));

         e.preventDefault();
      });
   };

   var bindToWindow = function(eventType, selector, eventName, userData) {
      $(window).on(eventType, selector, function() {
         App.PubSub.publish(eventName, _.extend({
            eventElement: $(this)
         }, userData));
      });
   };

   var bindToLoad = function(eventName, userData) {
      $(document).ready(function() {
         App.PubSub.publish(eventName, userData);
      });
   };

   var executeFunctionByName = function(functionName, context) {
      var args = Array.prototype.slice.call(arguments, 2),
          namespaces = functionName.split("."),
          func = namespaces.pop();

      for (var i=0, len = namespaces.length; i < len; ++i) {
         context = context[namespaces[i]];
      }

      return context[func].apply(context, args);
   };

   var binder = function(eventType, windowEvent, selector, eventName, funcName, userData) {
      console.log("Binder: "+eventName);
      if (eventType === "load") {
         bindToLoad(eventName, userData);
      } else if (windowEvent) {
         bindToWindow(eventType, selector, eventName, userData);
      } else {
         bindToDocument(eventType, selector, eventName, userData);
      }

      listenFor(eventName, funcName);

      return false;
   };

   return {

      bind: function(eventType, selector) {
         var evts = eventType.split(".");

         this.isWindowEvent = evts[0] == "window" ? true : false;
         this.eventType = evts.length > 1 ? evts[1] : evts[0];
         this.selector = _.isUndefined(selector) ? null : selector;

         return this;
      },

      to: function(eventName) {
         this.eventName = eventName;

         return this;
      },

      andCall: function(funcName, userData) {
         binder(this.eventType, this.isWindowEvent, this.selector, this.eventName, funcName, userData);
         return false;
      },

      bindTo: function(eventType, selector, eventName, funcName, userData) {
         this.bind(eventType, selector)
             .to(eventName)
             .andCall(funcName, userData);

         return false;
      }
   };

}();

