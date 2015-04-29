var Events = (function() {

   "use strict";

   /**
    * A (mostly) UUID, I don't know if this implementation should ever
    * be used in something something where you *really* need a
    * Universally Unique ID but for our purposes this  should work well
    *
    * @return {String}
    */
   var generateUUID = function() {
      var d = Date.now();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
         var r = (d + Math.random()*16)%16 | 0;
         d = Math.floor(d/16);
         return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });

      return uuid;
   };

   /**
    * If someone sends over a string as a function name this guy
    * will parse it out and call an actual function
    *
    * @param  {Function} functionName
    * @param  {Object} context
    * @param  {Object} userData
    * @return {Function}
    */
   var triggerFunctionByName = function(functionName, context, userData) {
      var namespaces = functionName.split("."),
          func = namespaces.pop();

      for (var i=0, len = namespaces.length; i < len; ++i) {
         context = context[namespaces[i]];
      }

      return context[func].apply(context, userData);

   };

   /**
    * If the user doesn't supply their own event name we will
    * generate our own
    *
    * @param  {String} asEventName
    * @return {String}
    */
   var generateEventName = function(asEventName) {

      if (_.isUndefined(asEventName)) {
         return "app/event/"+generateUUID();
      }

      return asEventName;
   };

   /**
    * Binds the context/selector to the event
    *
    * @param  {jQuery} bindEventContext
    * @param  {String} bindEvent
    * @param  {Integer} keyPress
    * @param  {String} selector
    * @param  {String} asEventName
    * @param  {Object} toUserData
    * @return Null
    */
   var doBind = function(bindEventContext, bindEvent, keyPress, selector, asEventName, toUserData) {

      bindEventContext.on(bindEvent, selector, function(e) {
         if (_.isNull(keyPress) || e.keyCode === keyPress || String.fromCharCode(e.which) === keyPress) {
            PubSub.publish(asEventName, _.extend({
               eventElement: this,
               eventKey: e.keyCode || null
            }, toUserData));

            e.preventDefault();
         }
      });
   };

   /**
    * Checks if we should bind an event based on the where you are in the app
    *
    * @param  {jQuery} bindEventContext
    * @param  {String} bindEvent
    * @param  {String} keyPress
    * @param  {String} selector
    * @param  {String} whereKey
    * @param  {String} whereValue
    * @param  {String} asEventName
    * @param  {Object} toUserData
    * @return Null
    */

   var doPublish = function(bindEventContext, bindEvent, keyPress, selector, whereKey, whereValue, asEventName, toUserData) {
      if (_.isUndefined(whereKey) || $(whereKey).hasClass(whereValue)) {
         doBind(bindEventContext, bindEvent, keyPress, selector, asEventName, toUserData);
      }
   };

   /**
    * Event listener
    *
    * @param  {String} asEventName
    * @param  {Function} funcName
    * @return {Function}
    */
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

      /**
       * [bind description]
       * @param  {String} bindEvent
       * @param  {String} selector
       * @return {Events}
       */
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

      /**
       * [where description]
       * @param  {String} key
       * @param  {String} value
       * @return {Events}
       */
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

      /**
       * [as description]
       * @param  {String} eventName
       * @return {Events}
       */
      as: function(eventName) {
         this.asEventName = eventName;

         return this;
      },

      /**
       * [to description]
       * @param  {Function | String} funcName
       * @param  {Object} context
       * @param  {Object} userData
       * @return false
       */
      to: function(funcName, context, userData) {
         var asEventName = generateEventName(this.asEventName);

         userData = _.isUndefined(userData) ? {} : userData;
         context = _.isUndefined(context) ? window : context;

         doPublish(this.bindEventContext, this.bindEvent, this.keyPress, this.selector, this.whereKey, this.whereValue, asEventName, userData);

         if (_.isFunction(funcName) ||  _.isArray(funcName)) {
            doSubscribe(asEventName, funcName, context);
         }

         return false;
      },

      /**
       * [listenFor description]
       * @param  {String} asEventName
       * @return {Events}
       */
      listenFor: function(asEventName) {
         this.asEventname = asEventName;

         return this;
      },

      /**
       * [andCall description]
       * @param  {Function} funcName
       * @return false
       */
      andCall: function(funcName) {
         doSubscribe(this.asEventName, funcName);

         return false;
      }
   };
})();
