// Tutorial: http://tagtree.tv/gulp
// Best practices: http://blog.rangle.io/angular-gulp-bestpractices/
// Recipes: https://github.com/gulpjs/gulp/tree/master/docs/recipes
/* TODO:
 controlling CORS?
 middleware for proxy, CORS, connect.json, and connect.urlencoded
 setting up reading package.json
 copying viewer to dist/viewer
 autoprefixer
 cssmin
 setting up backend (production server and proxy)
*/
var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

var connect = require('gulp-connect');
//var Proxy = require('gulp-connect-proxy');
var proxypage = require('proxypage');
var bodyParser = require('body-parser');

// var source = require('vinyl-source-stream');
// var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');

var config = {
  srcCss : 'viewer/css/**/*.css',
  distCss : 'dist/viewer/css',
  srcHtml : 'viewer/*.html',
  distHtml : 'dist/viewer',
  srcJs : 'viewer/js/**/*.js',
  distJs : 'dist/viewer/js/'
};

// Copies html, builds javascript and css, runs jshint, watches for changes and runs a web server and opens default browser to preview.
// TODO: Separate file copying for development and production
gulp.task('default', ['copy-html', 'copy-js', 'watch', 'jshint', 'build-js', 'build-css'], function() {
  // launch web server
  connect.server({
    port: 3000,
    root: 'viewer',
    livereload: true
  });
  connect.server({
    middleware: function(connect, opt) {
      var app = connect();
      var port = 3002;
      app.use(bodyParser.text({ type: 'text/html' }));
      app.use(bodyParser.json({ type: 'application/*+json' }));

      app.use('/proxy', proxypage.proxy);

      app.listen(port, function() {
        console.log('Connect server listening on port ' + port);
      });
    }
  });
});

gulp.task('copy-html', function () {
  // copy any html files in viewer to dist/viewer
  gulp.src(config.srcHtml)
    .pipe(gulp.dest(config.distHtml));
});

gulp.task('copy-js', function () {
  //copy any javascript files in viewer to dist/viewer
  gulp.src(config.srcJs)
    .pipe(gulp.dest(config.distJs));
});

gulp.task('build-css', function () {
  gulp.src(config.srcCss)
    .pipe(autoprefixer())
    // output non-minified CSS file
    .pipe(gulp.dest(config.distCss))
    // output minified CSS file
    .pipe(gutil.env.type == 'production' ? minifyCss() : gutil.noop())
    .pipe(gutil.env.type == 'production' ? rename({ extname: '.min.css' }) : gutil.noop())
    .pipe(gutil.env.type == 'production' ? gulp.dest(config.distCss) : gutil.noop());
});

gulp.task('watch', function() {
  // do we need to be this specific?
  gulp.watch(config.srcJs, ['jshint', 'build-js']);
  gulp.watch(config.srcCss, ['build-css']);
  gulp.watch(config.srcHtml, ['copy-html']);
});

gulp.task('jshint', function() {
  return gulp.src(config.srcJs)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', function() {
  return gulp.src(config.srcJs)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    // only uglify if gulp is run with '--type production'
    .pipe(gutil.env.type == 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.distJs));
});

 // 'test': 'Tests the project'
gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({ reporter: 'list' }))
    .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
  gulp.watch(['lib/**', 'test/**'], ['mocha']);
});

// 'build': 'Compiles all of the assets and copies the files to the build directory.', ['clean', 'copy', 'scripts', 'stylesheets', 'compress:build']


// 'build-view': 'Compiles all of the assets and copies the files to the build directory starts a web server and opens browser to preview app.', ['clean', 'copy', 'scripts', 'stylesheets', 'compress:build', 'connect:build', 'open:build_browser', 'watch:build']

// 'scripts': 'Compiles the JavaScript files.', ['jshint', 'uglify']
gulp.task('js', function() {
  browserify('./viewer/js/**/*.js')
    .bundle()
    .on('error', function(error) {
      gutil.log(error);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./viewer/js/dist'))
});

// 'stylesheets': 'Auto prefixes css and compiles the stylesheets.', ['autoprefixer', 'cssmin']

// 'jshint': 'Run simple jshint.', ['jshint']
