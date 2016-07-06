# Heisenberg Toolkit

## Introduction

Heisenberg is a toolkit of code to help you speed up the development of your front end projects that do not rely on frameworks like Angular or Vuejs.

### What's in the Box?

Heisenberg wants to get a whole bunch of low-level tasks out of your way so you can jump into coding your app.

When you download Heisenberg you get the following out-of-the-box:

+ Basic gulp tasks: Sass, Image Minification, PNG/SVG Sprites, JS/Sass Concatenation and Minification
+ A sensible way of organizing your Sass and Javascript
+ Mixins that will make your life easier
+ Grids with Susy, Media Queries, Normalized CSS with some sane defaults
+ Bower, HandlebarsJS and EditorConfig files
+ VanillaJS that helps you with events and ajax calls without the weight of jQuery

## Installing and Usage

There are a couple of pretty simple ways to get started with Heisenberg: clone this repo, download the zip, or use our installer.

### Heisenberg Installer

The [toolkit installer](https://github.com/JoeCianflone/heisenberg-toolkit-installer) is the easy way to pull down the latest Heisenberg release and to update its folder structure should you not like our defaults.

Once you've got it installed you just need to create a new directory on your system and from in there use the `install` command.

```bash
$ walt install
```

This is using the Laravel Console components, so if your familiar with the way it formats arguments vs options here is the install commands signature:

```Bash
$ walt install <src="src"> <dest="assets"> --dev --force --deps
```

Out-of-the-box `walt` will install all your source code (the code you should be working with) into the `src` directory. It will all compile to the `assets` folder, but since that's compiled unless you've run the `--deps` option you won't see that folder right away.

*Please note that order of `src` and `dest` is important.*

For more information please visit the [toolkit installer](https://github.com/JoeCianflone/heisenberg-toolkit-installer) repo.

## Features

### Gulp
Coming soon

### Sass

#### Basic Usage

#### Normalized Elements

#### Susy Grids

#### Flexbox

#### Sprites


### Javascript

Heisenberg is set up to make the javascript you write be more readable for humans. This tries to solve the problem of--when you don't have a framework-- where should something go?

Once your code start getting to a certain size you start to run into the issue where all your JS starts to become hot a mess. You have one external file that looks a lot like this:

```javascript
$(function(){
   // All your JS in here...
});
```

Now obviously, when you started this file, you expected to have only a couple onClick events...now you've got some crazy logic and it's difficult to keep track of anything.

#### Modules
Heisenberg has all your boilerplate JS baked in all you need to do is create a new module and start adding your events. If you take a look at the `/src/js/modules/example.js` you'll see a basic module template.

```javascript
   App.Modules = App.Modules || {};
   App.Modules.Introduction = function () {
      var o = { };

      return {
         init: function() {
            return this;
         },
         events: function() {
            return this;
         }
      };
   }();
```

This is a basic module. It utilizes the [revealing module design pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript) to keep your code private. The `init` method is where you write any code that you want *executed immediately* and code that you want available every time this module runs. `events` is where you will put your code to trigger events.

#### Events
The event system in Heisenberg is really just a fluent wrapper about modern javascript. We just wanted a way to make the code A) easier to read and B) easily repeatable. A simple event inside a module would work like the following:

```javascript
   App.Modules = App.Modules || {};
   App.Modules.Introduction = function () {
      var o = { };

      var foo = function(data) {
         console.log("You clicked me");
      };

      return {
         init: function() {
            return this;
         },
         events: function() {
            Events.bind("click", ".js-clicker").to(foo, {context: this});
            return this;
         }
      };
   }();
```

Thats it. With that one line, you've tied a click on an element with class `js-clicker` to the `foo` function in your module.

There's a lot more you can do here too. Lets say you only want that click event to bind when you're on a specific page.

```javascript
Events.bind("click",".js-clicker").when("body[class=about]").to(foo, {context: this});
```

`when()` events are booleans that check if an element is/is not on the page. In the back, it's using `querySelector` to see we can find an element then allow the binding to occur on that particular page.

Since `when()` uses `querySelector` you can do things like the following:

```javascript
Events.bind("click",".js-clicker").when("body:not(.foo)").to(foo, {context: this});
```

this makes sure the `<body>` does not have a class of `foo`.

Please note that this is *only* using `querySelector` and will not iterate over multiple elements, it's going to find the first item and check that, so make sure you're using this clause correctly.

You also get a special `data` variable that is always passed to the function so you can pass in your own extra data or get access to the special `eventElement` so you know what was clicked or triggered in general.

```javascript
   App.Modules = App.Modules || {};
   App.Modules.Introduction = function () {
      var o = { };

      var foo = function(data) {
         console.log(data.eventElement);
      };

      return {
         init: function() {
            return this;
         },
         events: function() {
            Events.bind("click", ".js-clicker").to(foo, {context: this});
            return this;
         }
      };
   }();
```

You can also check for keys to be pressed

```javascript
   App.Modules = App.Modules || {};
   App.Modules.Introduction = function () {
      var o = { };

      var foo = function(data) {
         // now this won't get called unless you hit key 13!
      };

      var bar = function(data) {
         //this gets called on every keyup...
      };

      return {
         init: function() {
            return this;
         },
         events: function() {
            Events.bind("keypress", ".js-enter-only", [13]).to(foo, {context: this});
            Events.bind("keyup", ".js-all-keys").to(bar, {context: this});
            return this;
         }
      };
   }();
```

#### PubSub

The whole system is built on PubSub and passing messages back-and-forth between different modules. You can use these PubSub methods inside your own code too, that way code in different modules can listen for events happening in other modules. *You should not just dump all your logic in to one module, you should make your modules logical and publish and subscribe to events*.


# License

The MIT License (MIT)
Copyright (c) 2015-2016 Joe Cianflone

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
