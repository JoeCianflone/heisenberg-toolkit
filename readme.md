# Heisenberg Toolkit

![2.5.0](https://img.shields.io/badge/version-2.5.0-green.svg)

## Introduction

Heisenberg is a toolkit/skeleton of code to help you speed up the development of your front end projects that do not rely on frameworks like Angular or Vuejs.

### What's in the Box?

Heisenberg wants to get a whole bunch of mid-level tasks out of your way so you can jump into coding your app.

When you download Heisenberg you get the following out-of-the-box:

+ Gulp tasks with Laravel Elixir (no you don't need to be using Laravel): Sass, Image Minification, JS/Sass Concatenation and Minification
+ A sensible way of organizing your Sass and Javascript
+ Mixins that will make your life easier
+ Grids with susy and flexbox, media query breakpoints, normalized CSS with some sane defaults
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

We've already pulled in the latest `normalize.css` so you're going to start every project with a good sensible base of clean HTML. Nothing you need to do here. Learn more about [Normalize](https://necolas.github.io/normalize.css/)

#### Media Queries
Media queries are awesome and Sass makes them super-easy to use. Now, there are about a million different things out there that make it easier to work with media queries. Heisenberg comes with the following breakpoints ready for you to use:

```scss
$breakpoints: (
    'sm': "min-width: 576px",
    'ms': "min-width: 640px",
    'md': "min-width: 768px",
    'ml': "min-width: 800px",
    'lg': "min-width: 992px",
    'xl': "min-width: 1200px",
);
```

All you need to do to use a breakpoint is this:

```scss
.foo {
    color: blue;

    @media (sm) {
        color: red;
    }

    @media (lg) {
        color: #ddd;
    }
}
```

#### Grids

Depending on the project, sometimes you need to roll-your-own grid and sometimes you don't. Heisenberg comes with two flavors of grids so you can choose what works best for your situation.

##### Susy

Susy grids are set up by default. You've got a 12 column grid with gutters split and box-sizing correctly set. If you'd like to change this head over to the `_variables.scss` file and update as you wish.

```scss
@include layout((
    columns: 12,
    gutter-position: split,
    gutters: 1/6,
    global-box-sizing: border-box
));
```

##### Flexbox Grid

Heisenberg comes with a flexbox grid system that we've developed that has many similarities to the grid used by Bootstrap, but is also a bit more verbose and reads a bit better. This readability is important because, in general, flexbox has a lot of different settings and they're not always easy to understand.

```html
<div class="grid is-aligned-center is-valigned-top can-wrap">
  <div class="column fills-lg-5 fills-md-6 fills-xs-4">foo</div>
  <div class="column fills-leftover">bar</div>
</div>
```


#### Modules
I'm a fan of keeping your Sass neat and in modules. To that end, Heisenberg has a `modules` folder and that's where all your different modules should go.

#### Other Sass Notes

Heisenberg has a bunch of mixins and functions that you can use to make life a bit easier:

`@include first-elem()` - Convenience mixin for :first-of-type

`@include odd-elem()` - Convenience mixin to get all the odd elements of a type

`@include even-elem()` - Convenience mixin to style all the even elements of a type

`@include last-elem()` - Convenience mixin to style the last element of a type

`@include clearfix()` - Simple clearfix mixin

`@include transition($transition-property, $transition-time, $method)` - transition--because I always forget

`@include font-size(font);` - Correctly convert your pixel fonts into REMs. This uses your base-font size (set in _variables.scss) to correctly calculate the REM size your font needs to be and this will also give you the correct pixel based fallback for super-old browsers


`@include font-face()` - Bringing in fonts that you need to load from your own server isn't difficult but it has a bit of tedium to it. If you need to bring in a bunch of fonts then it's easier to use this mixin.

```scss
 @include font-face((font-family: 'Open Sans', path: '/public/assets/fonts/OpenSansXYZ', weight: 'normal', style: 'normal'));
```

`z($increment: 1)` - I wanted a simple way to always increment/decrement my z-index value

`get-value($n)` - This will strip a unit off a number turning it from a string to a number

`get-color($name)` - Pulls the hex code out of the color map

`get-font-weight($size)` - Pulls the font-weight number out of the font-weight map

`get-font($setting)` - Pulls the value from the stack map

`get-line-height($font-size, $line-height)` - Calculates the correct unitless line-height based on the given font-size and line-height in pixels

`get-breakpoint($name)` - Returns the pixel number of a specific breakpoint

`rem($pxl)` - Returns the REM value based on the pixel value


`box($mps...)` - Returns the REM values for margins/paddings in typical "box" notation: top, right, bottom, left OR top/bottom left/right

Example:

```scss
.foo {
    margin: box(10px, 10px, 10px 10px);
    padding: box(10px, 20px);
}


// compiles to...
.foo {
    margin: 0.625rem, 0.625rem, 0.625rem, 0.625rem;
    padding: 0.625rem 1.25rem;
}
```



### Javascript

Heisenberg is set up to make the javascript you write be more readable for humans. This tries to solve the problem of--when you don't have a framework-- where should something go? Heisenberg is pretty lightweight, we don't use jQuery or any other frameworks, if you would like to use jQuery, you can, but it's not required.

Once your code start getting to a certain size you start to run into the issue where all your JS starts to become hot a mess. You have one external file that looks a lot like this:

```js
$(function(){
   // All your JS in here...
});
```

Now obviously, when you started this file, you expected to have only a couple `click` events...now you've got some crazy logic and it's difficult to keep track of anything.

#### Modules
The solution to this problem is to use a more modular style of coding, but setting that up can sometimes be a bit of a pain.

Heisenberg has all your boilerplate JS baked in all you need to do is create a new module and start adding your events. If you take a look at the `/src/js/modules/example.js` you'll see a basic module template.

```js
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

```js
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

```js
Events.bind("click",".js-clicker").when("body[class=about]").to(foo, this);
```

`when()` events are booleans that check if an element is/is not on the page. In the back, it's using `querySelector` to see we can find an element then allow the binding to occur on that particular page.

Please note that this is *only* using `querySelector` and will not iterate over multiple elements, it's going to find the first item and check that, so make sure you're using this clause correctly.

You also get a special `data` variable that is always passed to the function so you can pass in your own extra data or get access to the special `elem` so you know what was clicked or triggered in general.

```js
   App.Modules = App.Modules || {};
   App.Modules.Introduction = function () {
      var o = { };

      var foo = function(data) {
         console.log(data.elem);
      };

      return {
         init: function() {
            return this;
         },
         events: function() {
            Events.bind("click", ".js-clicker").to(foo, this);
            return this;
         }
      };
   }();
```

The `data` object will always have the following properties on it:

```js

data.elem   // the element acted on
data.target // event.target || event.srcElement,
data.key    // false if no key is pressed or the integer for the key
data.event  // the full event object
```

You can also check for keys to be pressed

```js
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
            Events.bind("keypress", ".js-enter-only").onKey([13]).to(foo, this);
            Events.bind("keyup", ".js-all-keys").to(bar, this);
            return this;
         }
      };
   }();
```

#### PubSub

The whole system is built on PubSub and passing messages back-and-forth between different modules. You can use these PubSub methods inside your own code too, that way code in different modules can listen for events happening in other modules. *You should not just dump all your logic in to one module, you should make your modules logical and publish and subscribe to events*.

If you want to publish or subscribe to your own calls:

```js
Events.publish('eventName', {foo: true});

Events.subscribe('eventName', func);
```

Pub/Sub methods register global events so you can publish something in one module and subscribe to it in another.


# License

The MIT License (MIT)
Copyright (c) 2015-2016 Joe Cianflone

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
