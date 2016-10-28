var Binder = (function() {

    var attachAsDocumentEvent = function(eo) {
        if (eo.selector.startsWith("#")) {
            return Attach.singleEvent(document.getElementById(eo.selector.replace("#", "")), eo);
        }

        return Attach.multipleEvents(document.querySelectorAll(eo.selector), eo);
    };

    return {
        bindSubscription: function(eo, funcName) {
            PubSub.subscribe(eo.asEventName, function(msg, data) {
                if (Array.isArray(funcName)) {
                    funcName.forEach(function(userFunc) {
                        userFunc.call(eo.context, data);
                    });
                    return false;
                }
                return funcName.call(eo.context, data);
            });
        },

        bindEvent: function(eo, funcName) {
            if (! eo.selector) {
                Attach.singleEvent(window, eo);
            } else {
                attachAsDocumentEvent(eo)
            }

            return this.bindSubscription(eo, funcName);
        }
    };
}());
