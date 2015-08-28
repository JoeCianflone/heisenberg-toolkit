var Utils = (function(){
   "use strict";

   return {
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
            return "app/event/" + Utils.generateUUID();
         }

         return asEventName;
      }
   };
}());

var Binder = (function() {
   "use strict";

   return {
      asLoad: function(eo) {
         if (eo.bindEvent === "unload") {
            $(document).unload(function() {
               PubSub.publish(eo.asEventName, eo.userData);
            });

            return false;
         }

         if (eo.context == window) {
            $(window).load(function() {
               PubSub.publish(eo.asEventName, eo.userData);
            });

            return false;
         }

         $(document).ready(function() {
            PubSub.publish(eo.asEventName, eo.userData);
         });

         return false;
      },

      asKeyboard: function(eo) {
         var keyType = (eo.bindEvent === "key" || eo.bindEvent === "keydown") ? "keydown" : eo.bindEvent;
         $(document).on(keyType, eo.selector, function(e) {
            var charCode = (e.which ? e.which : e.keyCode);
            _.each(eo.keyPress, function(element, index, list){
               if (element === charCode) {
                  PubSub.publish(eo.asEventName, _.extend({
                     eventElement: $(eo.selector +":focus") || null
                  }, eo.userData));
               }
            });
         });
      },

      asTyping: function(eo) {
         $(document).on("keyup", eo.selector, function(e) {
            PubSub.publish(eo.asEventName, _.extend({
               eventElement: $(eo.selector +":focus") || null
            }, eo.userData));
         });
      },

      asDocument: function(eo) {
         $(document).on(eo.bindEvent, eo.selector, function(e) {

            PubSub.publish(eo.asEventName, _.extend({
               eventElement: $(this)
            }, eo.userData));

            e.stopImmediatePropagation();
            e.preventDefault();
         });

      },

      asWindow: function(eo) {
         $(window).on(eo.bindEvent, eo.selector, function(e) {
            PubSub.publish(eo.asEventName, _.extend({
               eventElement: $(this)
            }, eo.userData));
            e.preventDefault();
         });

         return false;
      },

      asMouse: function(eo) {
         return this.asDocument(eo);
      },

      asForm: function(eo) {
         return this.asDocument(eo);
      },

      generic: function(eo) {
         $(document).on(eo.bindEvent, eo.selector, function(e) {
            PubSub.publish(eo.asEventName, _.extend({
               eventElement: $(this)
            }, eo.userData));
         });
      }

    };
}());

var Events = (function() {
   "use strict";

   var eventObject = {
      context:          undefined,
      keyPress:         undefined,
      selector:         undefined,
      whereKey:         undefined,
      userData:         undefined,
      bindEvent:        undefined,
      whereType:        undefined,
      whereValue:       undefined,
      asEventName:      undefined,
      bindEventContext: undefined
   };

   var triggers = {
      pub: function(eo) {
         if (_.isUndefined(eo.whereKey) || eo.whereKey.length <= 0) {
            bindEventAs(eo);
         } else {
            var whereKey   = eo.whereKey.shift();
            var whereValue = eo.whereValue.shift();
            var whereType  = eo.whereType.shift();
            var attribute  = whereKey.match(/\[(.*?)\]/);

            if (whereType == "equal" && $(whereKey).attr(attribute[1]) == whereValue) {
                  this.pub(eo);
            }

            if (whereType == "not-equal" && $(whereKey).attr(attribute[1]) != whereValue) {
               this.pub(eo);
            }

            return false;
         }
      },
      sub: function(eo, funcName) {
         PubSub.subscribe(eo.asEventName, function(data) {
            if (_.isArray(funcName)) {
               _.each(funcName, function(userFunc) {
                  userFunc.call(eo.context, data);
               });
               return false;
            }
            return funcName.call(eo.context, data);
         });
      }
   };

   var bindEventAs = function(eo) {
      if (eo.bindEvent === "ready" || eo.bindEvent === "load" || eo.bindEvent === "unload") {
         return Binder.asLoad(eo);
      }

      if (eo.bindEvent.indexOf("key") === 0) {
         return Binder.asKeyboard(eo);
      }

      if (eo.bindEvent === "resize" || eo.bindEvent === "scroll") {
         return Binder.asWindow(eo);
      }

      if (eo.bindEvent.indexOf("mouse") === 0 || eo.bindEvent === "hover" || eo.bindEvent === "click" || eo.bindEvent === "dblclick") {
         return Binder.asMouse(eo);
      }

      if (eo.bindEvent.indexOf("focus") === 0 || eo.bindEvent === "blur" || eo.bindEvent === "change" || eo.bindEvent === "select" || eo.bindEvent === "submit") {
         return Binder.asForm(eo);
      }

      if (eo.bindEvent === "typing") {
         return Binder.asTyping(eo);
      }

      // we don't kow wtf you're trying to bind so
      // lets do something and see what happens
      return Binder.generic(eo);
   };

   return {

      bind: function(bindEvent, selector, key) {
         eventObject.bindEvent = bindEvent;
         eventObject.selector  = _.isUndefined(selector) ? null : selector;
         eventObject.keyPress  = _.isUndefined(key) ? null : key;

         if (eventObject.bindEvent.indexOf("key") === 0 && _.isNull(eventObject.keyPress)) {
            eventObject.keyPress = eventObject.selector;
            eventObject.selector = null;
         }

         return this;
      },

      where: function(key, value) {
         this.whereType("equal", key, _.isUndefined(value) ? key : value);

         return this;
      },

      whereNot: function(key, value) {
         this.whereType("not-equal", key, _.isUndefined(value) ? key : value);

         return this;
      },

      whereType: function(type, key, value) {
         if (_.isUndefined(eventObject.whereType)) {
            eventObject.whereType = [];
            eventObject.whereKey = [];
            eventObject.whereValue = [];
         }

         eventObject.whereType.push(type);
         eventObject.whereKey.push(key);
         eventObject.whereValue.push(value);
      },

      as: function(eventName) {
         eventObject.asEventName = eventName;

         return this;
      },

      to: function(funcName, context, userData) {
         eventObject.asEventName = Utils.generateEventName(eventObject.asEventName);
         eventObject.userData    = _.isUndefined(userData) ? {} : userData;
         eventObject.context     = _.isUndefined(context) ? window : context;
         triggers.pub(eventObject);

         if (_.isFunction(funcName) ||  _.isArray(funcName)) {
            triggers.sub(eventObject, funcName);
         }

         eventObject = {};
         return false;
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
}());
