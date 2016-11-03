# Heisenberg Toolkit

![2.0.0](https://img.shields.io/badge/version-2.0.0-green.svg)

## Introduction

Heisenberg is a toolkit of code to help you speed up the development of your front end projects that do not rely on frameworks like Angular or Vuejs.

### What's in the Box?

Heisenberg wants to get a whole bunch of mid-level tasks out of your way so you can jump into coding your app.

When you download Heisenberg you get the following out-of-the-box:

+ Gulp tasks with Laravel Elixir (no you don't need to be using Laravel): Sass, Image Minification, JS/Sass Concatenation and Minification
+ A sensible way of organizing your Sass and Javascript
+ Mixins that will make your life easier
+ Grids with Susy, Media Queries, Normalized CSS with some sane defaults
+ Yarn and EditorConfig files

## Installing and Usage

There are a couple of ways to get started with Heisenberg: clone this repo, download the zip, or use our installer.

### Manual Install

If you clone this repo you're going to have to make a couple of changes before you can use it. Heisenberg tries not to impose a structure on where you put your files. Because of this, we have some placeholders `{{src}}` and `{{dest}}` blocks located inside the `gulpfile.js`, `heisenberg.html`, `.gitignore` and `.heisenberg` files.

Replace `{{src}}` with where your raw, uncompiled files will live and replace `{{dest}}` with where you'd like all your compiled/public files to go. If you use the installer, you don't have to worry about this, it's done automatically for you.

### Heisenberg Installer

The [toolkit installer](https://github.com/JoeCianflone/heisenberg-toolkit-installer) is the easy way to pull down the latest Heisenberg release and to update its folder structure should you not like our defaults. You can install this via composer

```bash
$ composer require joecianflone/heisenberg-toolkit-installer
```

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

### Sass

Heisenberg uses Sass as the default preprocessor. It's widely used and there are a ton of great tutorials around so look them up! The good news is, if you're not familiar with Sass, you can still write plain old CSS and it will work.

Heisenberg sets up a default structure for your applications, with a sensible default system that doesn't impose too any design restrictions on you.

#### Basic Usage

Because Elixir is going to take care of the concatenation for you, Heisenberg is expecting you to work in modules. Don't worry about how many modules you generate, we'll compile them down for you.

#### Normalized Elements

We've already pulled in the latest `normalize.css` so you're going to start every project with a good sensible base of clean HTML. Nothing you need to do here.

#### Variables

#### Media Queiries

#### Grid

#### Modules

### Javascript

Heisenberg is set up to make the javascript you write be more readable for humans. This tries to solve the problem of--when you don't have a framework-- where should something go? Heisenberg is pretty lightweight, we don't use jQuery or any other frameworks, if you would like to use jQuery, you can, but it's not required.

Once your code start getting to a certain size you start to run into the issue where all your JS starts to become hot a mess. You have one external file that looks a lot like this:

```javascript
$(function(){
   // All your JS in here...
});
```

Now obviously, when you started this file, you expected to have only a couple `click` events...now you've got some crazy logic and it's difficult to keep track of anything.

#### Modules
The solution to this problem is to use a more modular style of coding, but setting that up can sometimes be a bit of a pain.

Heisenberg has all your boilerplate JS baked in all you need to do is create a new module and start adding your events. If you take a look at the `/src/js/modules/example.js` you'll see a basic module template.

```javascript
   App.Modules = App.Modules || {};
   App.Modules.<ModuleName> = function () {
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

This is the [revealing module design pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript) and it's a great way to keep some code public and some code private and a great way to keep everything organized in a logical way.

##### The public functions
Both the `init` and the `events` function are called on `DOMContentLoaded` so you don't need to wrap anything in load events. So why have both an `init` and `events` function? Because it's a great way to keep your code organized. Let's look at a more complete example to understand:

```javascript
   App.Modules = App.Modules || {};
   App.Modules.Demo = function () {
      var o = { };

      var thatHappened = function() {
        return true;
      };

      var foo = function(data) {
         if (thatHappened()) {
            console.log(data.elem);
         }
      };

      return {
         init: function() {
             console.log('Init Module Demo');
            return this;
         },
         events: function() {
            Events.bind("click", ".js-clicker").withData({bar: true}).to(foo, this);

            return this;
         }
      };
   }();
```

#### Events
The event system in Heisenberg is really just a fluent wrapper about modern javascript. We just wanted a way to make the code A) easier to read and B) easily repeatable. A simple event inside a module would work like the following:



Thats it. With that one line, you've tied a click on an element with class `js-clicker` to the `foo` function in your module.

There's a lot more you can do here too. Lets say you only want that click event to bind when you're on a specific page.

```javascript
Events.bind("click",".js-clicker").when("body[class=about]").to(foo, {context: this});
```

`when()` events are booleans that check if an element is/is not on the page. In the back, it's using `querySelector` to see we can find an element then allow the binding to occur on that particular page.

Since `when()` uses `querySelector` you can do things like the following:

```javascript
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
