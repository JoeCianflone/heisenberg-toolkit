var Utils = (function(){

    return {
        isUndefined: function(elem) {
            return (typeof elem == "undefined");
        },

        startsWith: function(needle, haystack) {
            return haystack.substr(0, needle.length) === needle;
        },

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
            return "app/event/" + Utils.generateUUID();;
        },

        mergeObjects: function(obj, src) {
            Object.keys(src).forEach(function(key) { obj[key] = src[key]; });

            return obj;
        },

        forEach: function(array, callback, scope) {
            for (var i = 0, len=array.length; i < len; ++i) {
                callback.call(scope, i, array[i]);
            }
        }
    };
}());
