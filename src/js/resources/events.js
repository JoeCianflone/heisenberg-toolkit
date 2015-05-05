var Events = (function() {
   "use strict";

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
      },
      asScroll: function(bindEventContext, bindEvent, keyPress, selector, asEventName, toUserData) {
         $(selector).scroll(function() {
            PubSub.publish(asEventName, _.extend({
               eventElement: $(this)
            }, toUserData));
         });
      },
      asNormal: function(bindEventContext, bindEvent, selector, asEventName, toUserData) {
         bindEventContext.on(bindEvent, selector, function(e) {
            PubSub.publish(asEventName, _.extend({
               eventElement: $(this),
            }, toUserData));

            e.preventDefault();
            e.stopPropagation();
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

         this.bindEventContext = splitEvents.length > 1 ? $(window) : $(document);
         this.bindEvent        = splitEvents.length > 1 ? splitEvents[1] : splitEvents[0];
         this.selector         = _.isUndefined(selector) ? null : selector;
         this.keyPress         = _.isUndefined(key) ? null : key;

         if (this.bindEvent.indexOf("key") === 0 && _.isNull(this.keyPress)) {
            this.keyPress = this.selector;
            this.selector = null;
         }

         return this;
      },

      where: function(key, value) {
         if (_.isUndefined(value)) {
            this.whereKey = "body";
            this.whereValue = key;

            return this;
         }

         this.whereKey    = key;
         this.whereValue  = value;

         return this;
      },

      as: function(eventName) {
         this.asEventName = eventName;

         return this;
      },

      to: function(funcName, context, userData) {
         var asEventName = utils.generateEventName(this.asEventName);
             userData = _.isUndefined(userData) ? {} : userData;
             context = _.isUndefined(context) ? window : context;

         doPublish(this.bindEventContext, this.bindEvent, this.keyPress, this.selector, this.whereKey, this.whereValue, asEventName, userData);

         if (_.isFunction(funcName) ||  _.isArray(funcName)) {
            doSubscribe(asEventName, funcName, context);
         }

         return false;
      },

      andBoradcast: function(data) {
         this.to(data);

         return false;
      },

      listenFor: function(asEventName) {
         this.as(asEventName);

         return this;
      },

      andCall: function(funcName, context) {
         doSubscribe(this.asEventName, funcName, context);
         return false;
      }
   };
})();
