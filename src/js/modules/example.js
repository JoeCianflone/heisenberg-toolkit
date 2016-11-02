App.Modules = App.Modules || {};
App.Modules.Example = function () {
    var o = { };

    var hello = function(data) {
        console.log();
    };

    var captureKeys = function(data) {
        console.log(data);
    };

    return {
        init: function() { return this; },
        events: function() {
            Events.bind("click", ".foo").to(hello, this);
            Events.bind("keydown").withData({foo: true, bar: false}).to(captureKeys);

            return this;
        }
    };
}();

