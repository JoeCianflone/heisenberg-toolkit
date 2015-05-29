var Events = (function() {
   "use strict";

   var eventObject = {
      whereKey:         "",
      keyPress:         "",
      selector:         "",
      bindEvent:        "",
      whereValue:       "",
      asEventName:      "",
      bindEventContext: ""
   };

   var utils = {
      generateUUID: function() {
         var d = Date.now();
         var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
         });

         return uuid;
      },
      generateEventName: function(asEventName) {
         if (_.isUndefined(asEventName)) {
            return "app/event/"+utils.generateUUID();
         }

         return asEventName;
      }
   };

   var doBind = {
      asPageLoad: function(bindEventContext, asEventName, toUserData) {
         bindEventContext.ready(function() {
            PubSub.publish(asEventName, toUserData);
         });

         return false;
      },

      asKeyPress: function(bindEventContext, bindEvent, keyPress, selector, asEventName, toUserData) {
         $(document).on("keydown", selector, function(e) {
            var charCode = (e.which ? e.which : e.keyCode);
            _.each(keyPress, function(element, index, list){
               if (element === charCode) {
                 PubSub.publish(asEventName, _.extend({
                    eventElement: $(selector +":focus") || null
                 }, toUserData));
               }
            });
         });

         return false;
      },

      asScroll: function(bindEventContext, bindEvent, keyPress, selector, asEventName, toUserData) {
         $(selector).scroll(function() {
            PubSub.publish(asEventName, _.extend({
               eventElement: $(this)
            }, toUserData));
         });

         return false;
      },

      asNormal: function(bindEventContext, bindEvent, selector, asEventName, toUserData) {
         bindEventContext.on(bindEvent, selector, function(e) {
            PubSub.publish(asEventName, _.extend({
               eventElement: $(this)
            }, toUserData));

            e.stopImmediatePropagation();
            e.preventDefault();
         });

         return false;
      }
   };

   var triggerBind = function(bindEventContext, bindEvent, keyPress, selector, asEventName, toUserData) {
      if (bindEvent === "load") {
         return doBind.asPageLoad(bindEventContext, asEventName, toUserData);
      }

      if (bindEvent.indexOf("key") === 0) {
         return doBind.asKeyPress(bindEventContext, bindEvent, keyPress, selector, asEventName, toUserData);
      }

      if (bindEvent.indexOf("scroll") === 0) {
         return doBind.asScroll(bindEventContext, bindEvent, keyPress, selector, asEventName, toUserData);
      }

      return doBind.asNormal(bindEventContext, bindEvent, selector, asEventName, toUserData);
   };

   var doPublish = function(bindEventContext, bindEvent, keyPress, selector, whereKey, whereValue, asEventName, toUserData) {
      if (_.isUndefined(whereKey) || $(whereKey).hasClass(whereValue)) {
         triggerBind(bindEventContext, bindEvent, keyPress, selector, asEventName, toUserData);
      }

      return false;
   };

   var doSubscribe = function(asEventName, funcName, context) {
      PubSub.subscribe(asEventName, function(data) {
         if (_.isArray(funcName)) {
            _.each(funcName, function(userFunc) {
               userFunc.call(context, data);
            });

            return false;
         }
         return funcName.call(context, data);
      });
   };

   return {

      bind: function(bindEvent, selector, key) {
         var splitEvents = bindEvent.split(".");

         eventObject.bindEventContext = splitEvents.length > 1 ? $(window) : $(document);
         eventObject.bindEvent        = splitEvents.length > 1 ? splitEvents[1] : splitEvents[0];
         eventObject.selector         = _.isUndefined(selector) ? null : selector;
         eventObject.keyPress         = _.isUndefined(key) ? null : key;

         if (eventObject.bindEvent.indexOf("key") === 0 && _.isNull(eventObject.keyPress)) {
            eventObject.keyPress = eventObject.selector;
            eventObject.selector = null;
         }

         return this;
      },

      where: function(key, value) {
         if (_.isUndefined(value)) {
            eventObject.whereKey = "body";
            eventObject.whereValue = key;

            return this;
         }

         eventObject.whereKey    = key;
         eventObject.whereValue  = value;

         return this;
      },

      as: function(eventName) {
         eventObject.asEventName = eventName;

         return this;
      },

      to: function(funcName, context, userData) {
         var asEventName = utils.generateEventName(eventObject.asEventName);

         userData = _.isUndefined(userData) ? {} : userData;
         context = _.isUndefined(context) ? window : context;
         doPublish(eventObject.bindEventContext, eventObject.bindEvent, eventObject.keyPress, eventObject.selector, eventObject.whereKey, eventObject.whereValue, asEventName, userData);

         if (_.isFunction(funcName) ||  _.isArray(funcName)) {
            doSubscribe(asEventName, funcName, context);
         }

         // Kill everything before you go out...
         eventObject = {};

         return false;
      },

      trigger: function(eventType, element) {
         $(element).trigger(eventType);
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
})();
