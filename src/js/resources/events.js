var Events = (function() {
    var eo = {};

    return {
        when: function(contextString) {
            eo.when = !!document.querySelector(contextString);

            return this;
        },

        with: function(key, value) {
            eo[key] = value;

            return this;
        },

        withData: function(data) {
            this.with('data', data);

            return this;
        },

        withoutBubble: function() {
            this.with('prevent', true);

            return this;
        },

        onKey: function(keyList) {
            this.with('keyPress', keyList);

            return this;
        },

        bind: function(bindEvent, selector) {
            eo.bindEvent  = bindEvent;
            eo.selector   = Utils.isUndefined(selector) ? false : selector;
            eo.when       = Utils.isUndefined(eo.when) ? true : eo.when;
            eo.isKeyEvent = Utils.startsWith("key", eo.bindEvent) ? true : false;
            eo.keyPress   = Utils.isUndefined(eo.keyPress) ? [] : eo.keyPress;
            eo.prevent    = false;
            eo.data       = {};

            return this;
        },

        to: function(funcName, context) {
            eo.asEventName = Utils.generateEventName();
            eo.context = Utils.isUndefined(context) ? window : context;

            if (eo.when) {
                Binder.bindEvent(eo, funcName);
            }

            eo = {};
            return false;
        },

        publish: function(eventName, data) {
            PubSub.publish(eventName, data);
        },

        subscribe: function(eventName, funcName, context) {
            PubSub.subscribe(eventName, function(msg, data) {
                return funcName.call(context, data);
            });
        }
    };
}());
