"use strict";

(function() {
    var App = {};
    window.App = App;

    document.addEventListener('DOMContentLoaded', function(e) {
        for (var module in App.Modules) {
            App.Modules[module].init().events();
        }
    });
})();
