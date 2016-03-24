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
$ walt install --deps
```

The `--deps` flag will pull down all the dependencies from NPM and Bower and compile everything the first time.

By default Heisenberg puts all your sass, javascript and images into a `src` folder and outputs everything to an `assets` folder. If you want to change that you can through the installer too.

```bash
$ walt install --src="raw-files" --dest="dist"
```

This will make sure that the `bowerrc` files and all any gulp configuration files are correctly updated so when you next run `gulp compile` everything will work as expected.

## Features

### Gulp
Coming soon

### Sass
Coming soon

### Javascript
Coming soon


# License

The MIT License (MIT)
Copyright (c) 2015-2016 Joe Cianflone

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
