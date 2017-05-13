# Gulp + Twig + Less + JS
By Renan Dias
renanmfd@gmail.com
---

## Features

* File watch
* Browser sync
* HTML
    - TWIG (Template engine)
    - TWIG lint (not yet)
* CSS
    - LESS (preprocessor)
    - LESS Hint configurable (file .lesshintrc)
    - Autoprefixing
    - Minification
    - Sourcemapping
* JS
    - ESLint configurable (file .eslintrc)
    - Complexity calculation
    - Minification
* Images
    - Image minification
    - Favicon generator (not yet)


## Install

### NodeJS

NodeJS is a runtime enviroment for javascript.

#### Check if you have

To check if you have it, type on the command line (cmd on windows):

`$ node -v`

If installed, you should see the version of NodeJS, something like `v4.4.3`, if not, you'll see a message telling that the command wasn't found.

#### Installing

To install NodeJS, go to the [official website](https://nodejs.org/en/) and download the stable version for your operating system.
On windows, execute the .msi as admin and follow instructions.
On linux, give the file execution permission and execute as admin.


### NPM

NPM is a package manager for NodeJS.
Normally, it comes with node. So if you have node installed, npm will work just fine. To test, on command line, type `npm -v` and you should see the version of npm, something like `2.15.1`. If not, try reinstalling NodeJS.


### Gulp Global

To be able to use some package on the command line, you have to install it **globally** on your PC. In this case, we'll need gulp to be available on the command line.
Type `$ npm install -g gulp` to install it.


### Gulp Packages

Now, we you need to install the packages that Gulp will use. They are all listed on the **package.json** file. To install them, run `$ npm install`. It should take a few seconds to download all the dependencies of the project.
If something goes wrong, try running the command again.


## Usage

Having all installed, now you're ready to run gulp. Type `$ gulp` on the command line. If everything works as expected, you'll have a new browser tab openning, serving the index.html on the `./app` folder, if any. Also, gulp will be watching for any changes in the files on `./src` folder and will run tasks for each type of file (HTML, CSS, JS, IMG). To kill gulp, hit `CTRL+C` twice.

You'll only change the files on `./src` folder. The `./app` folder will be build by gulp every time it first run or some file change when it's watching.

If an linting error is presented, the build will not be made.

Twig data will be on the data.json file, located in `./src/twig/data.json`.

The Gulp tasks are:
* less - Compile and minify the file ./src/less/style.less.
* less-lint - Lint every less file on ./src/less/ directory.
* js - Minify javascript files on ./js/ directory.
* js-lint - Run ESLint on all javascript files.
* twig - Compile ./src/twig/index.twig.
* img - Minify images on ./src/img/ directory.
* fonts - Only copy the files on ./src/fonts/
* watch - Init browsersync and watch twig, less and js files for changes.

All operations outputs in the `./app/` folder.
You can run them independent, with `$ gulp <task_name>`.
