App.Modules = App.Modules || {};
App.Modules.Introduction = function () {
    var o = { };

    var hello = function(data) {
        console.log(data);
    };

    var captureKeys = function(data) {
        console.log(data);
    };

    var resizer = function(data) {
        console.log(data);
    };

    return {
        init: function() { return this; },
        events: function() {
            // standard call to a click event
            Events.bind("click", ".foo").to(hello, {context: this});

            // keydown capture on all textareas, we're also passing "extra"
            // data by way of the `foo` variable
            Events.bind("keydown", "textarea").to(captureKeys, {data: {
                foo: true
            } });

            // This will be bound to the `window` context by default
            Events.bind("resize").to(resizer);

            return this;
        }
    };
}();

