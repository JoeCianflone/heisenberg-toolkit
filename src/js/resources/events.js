var Events = (function() {
    var eo = {};

    var mapper = function() { };

    return {
        when: function(contextString) {
            eo.when = !!document.querySelector(contextString);

            return this;
        },

        bind: function(bindEvent, selector, key) {
            eo.when       = typeof eo.when == 'undefined' ? true : eo.when;
            eo.bindEvent  = bindEvent;
            eo.selector   = ! selector ? false : selector;
            eo.keyPress   = ! key ? false : key;
            eo.isKeyEvent = eo.bindEvent.substr(0, 3) === "key" ? true : false;

            if (Array.isArray(selector)) {
                eo.selector = false;
                eo.keyPress = selector;
            }


            return this;
        },

        to: function(funcName, options) {
            eo.asEventName = Utils.generateEventName();

            eo.context   = ! options.context ? window : options.context;
            eo.userData  = ! options.data ? {} : options.data;
            eo.prevent   = (typeof options.prevent === "undefined") ? true : options.prevent;

            if (eo.when) {
                Binder.bindEvent(eo, funcName);
            }

            eo = {};
            return eo;
        },

        publish: function(eventName, userData) {
            PubSub.publish(eventName, userData);
        },

        subscribe: function(eventName, funcName, context) {
            PubSub.subscribe(eventName, function(msg, data) {
                return funcName.call(context, data);
            });
        }
    };
}());
