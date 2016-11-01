var Events = (function() {

    var eo = {};


    return {
        when: function(contextString) {
            eo.when = !!document.querySelector(contextString);

            return this;
        },

        with: function(key, value) {
            if (key == 'data') {
                this.with('userData', value)
            }

            eo[key] = value;

            return this;
        },

        withData: function(data) {
            this.with('userData', data);

            return this;
        },
        withNoBubble: function() {
            this.with('prevent', true);

            return this;
        },

        onKey: function(keyList) {
            this.with('keyPress', keyList);

            return this;
        },

        bind: function(bindEvent, selector) {
            eo.when       = Utils.isUndefined(eo.when) ? true : eo.when;
            eo.bindEvent  = bindEvent;
            eo.selector   = Utils.isUndefined(selector) ? false : selector;
            eo.isKeyEvent = Utils.startsWith("key", eo.bindEvent) ? true : false;
            eo.keyPress   = Utils.isUndefined(eo.keyPress) ? [] : eo.keyPress;
            eo.prevent    = false;

            return this;
        },

        to: function(funcName, context) {
            eo.asEventName = Utils.generateEventName();
            eo.context = Utils.isUndefined(context) ? window : context;

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
