/*jslint browser: true, devel: true, node: true, rhino: false, nomen: true,
         regexp: true, unparam: true, indent: 4, maxlen: 80*/

// Polyfill
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    'use strict';
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

/**
 * @author Tursites / Renan
 *
 * GULP
 * -- HTML
 *    > Jade
 *    > Jade lint
 * -- CSS
 *    > CSSLint (https://github.com/lazd/gulp-csslint)
 *    > Sourcemaps (https://github.com/floridoo/gulp-sourcemaps)
 *    > PostCSS (https://github.com/postcss/postcss)
 *    > Autoprefixer (https://github.com/postcss/autoprefixer)
 *    > PXtoREM (https://github.com/cuth/postcss-pxtorem)
 *    > CSSComb (https://github.com/koistya/gulp-csscomb)
 *    > CleanCSS (https://github.com/scniro/gulp-clean-css)
 * -- Javascript
 *    > ESLint (https://github.com/karimsa/gulp-jslint)
 *    > Complexity (https://github.com/alexeyraspopov/gulp-complexity)
 *    > Uglify (https://github.com/terinjokes/gulp-uglify)
 * -- Images
 *    > ImageMin
 * -- Favicons
 *    > Favicons
 */
(function gulpClosure() {
  'use strict';

  // Gulp core.
  var gulp = require('gulp'),

    // Browser sync.
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,

    // Utils.
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    cache = require('gulp-cached'),
    gutil = require('gulp-util'),
    data = require('gulp-data'),
    path = require('path'),
    fs = require('fs'),

    // HTML tools.
    twig = require('gulp-twig'),
    prettify = require('gulp-html-prettify'),

    // CSS tools.
    lesshint = require('gulp-lesshint'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    LessPluginCSScomb = require('less-plugin-csscomb'),
    cleancss = new LessPluginCleanCSS({
      advanced: true
    }),
    autoprefix = new LessPluginAutoPrefix({
      browsers: ["last 2 versions"]
    }),
    csscomb = new LessPluginCSScomb("zen"),

    // Javascript tools.
    eslint = require('gulp-eslint'),
    complexity = require('gulp-complexity'),
    uglify = require('gulp-uglify'),

    // Imaging tools.
    imageMin = require('gulp-imagemin'),
    favicons = require("gulp-favicons"),

    // Configuration.
    config = {
      source: './src',
      build: './app'
    },
    plumberOpt = {
      handleError: function (err) {
        console.log('Plumber ->', err);
        this.emit('end');
      }
    };
 
  /**
   * HTML build.
   */
  gulp.task('twig-lint', function () {
    
  });
  gulp.task('twig', ['twig-lint'], function htmlTask() {
    return gulp.src(config.source + '/twig/index.twig')
      .pipe(plumber(plumberOpt))
      .pipe(twig({
        data: JSON.parse(fs.readFileSync(config.source + '/twig/data.json'))
      }))
      .pipe(prettify({indent_char: ' ', indent_size: 2}))
      .pipe(gulp.dest(config.build + '/'))
      .pipe(reload({
        stream: true
      }));
  });

  /**
   * CSS build.
   */
  gulp.task('less-lint', function cssTask() {
    return gulp.src(config.source + '/less/**/*.less')
      .pipe(plumber(plumberOpt))
      .pipe(lesshint({
        // Options
      }))
      .pipe(lesshint.reporter())
      .on('error', function () {
        gutil.log('Less lint error');
      });
  });
  gulp.task('less', ['less-lint'], function cssTask() {
    return gulp.src(config.source + '/less/styles.less')
      .pipe(plumber(plumberOpt))
      .pipe(sourcemaps.init())
      .pipe(less({
        plugins: [autoprefix, csscomb, cleancss]
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.build + '/css/'))
      .pipe(reload({
        stream: true
      }));
  });

  /**
   * Javascript build.
   */
  gulp.task('js-lint', function () {
    return gulp.src([config.source + '/js/**/*.js'])
      .pipe(plumber(plumberOpt))
      .pipe(eslint('.eslintrc'))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });
  gulp.task('js', ['js-lint'], function jsTask() {
    return gulp.src([config.source + '/js/**/*.js'])
      .pipe(cache('js'))
      .pipe(plumber(plumberOpt))
      .pipe(complexity())
      .pipe(gulp.dest(config.build + '/js/'))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(uglify())
      .pipe(gulp.dest(config.build + '/js/'))
      .pipe(reload({
        stream: true
      }));
  });

  /**
   * Image build.
   */
  gulp.task('img', function () {
    gulp.src([config.source + '/img/*'])
      .pipe(plumber(plumberOpt))
      .pipe(cache(imageMin()))
      .pipe(gulp.dest(config.build + '/img/'));
  });
  
  /**
   * Font folder copy.
   */
  gulp.task('fonts', function () {
    gulp.src([config.source + '/fonts/*'])
      .pipe(gulp.dest(config.build + '/fonts/'));
  });

  /**
   * Browser sync watch.
   */
  gulp.task('watch', function watchTask() {
    browserSync.init({
      server: config.build + '/'
    });

    gulp.watch(config.source + '/twig/**/*.twig', ['twig']);
    gulp.watch(config.source + '/less/**/*.less', ['less']);
    gulp.watch(config.source + '/js/**/*.js', ['js']);
  });

  gulp.task('default', ['twig', 'less', 'js', 'img', 'fonts', 'watch']);
}());
