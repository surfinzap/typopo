const gulp = require('gulp');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const http = require('http');
const st = require('st');

const buildPath = './build/';


gulp.task('build-dev', function () {
  return browserify({entries: './src/typopo.js', debug: true})
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(source('typopo.built.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(buildPath))
    .pipe(livereload());
});

gulp.task('build-browser-dev', function () {
  return browserify({entries: './src/browser_typopo.js', debug: true})
    .transform("babelify")
    .bundle()
    .pipe(source('typopo_browser.built.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(buildPath))
    .pipe(livereload());
});

gulp.task('build', ['build-browser'], function () {
  return browserify({entries: './src/typopo.js'})
    .transform("babelify")
    .bundle()
    .pipe(source('typopo_dist.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('build-browser', function () {
  return browserify({entries: './src/browser_typopo.js'})
    .transform("babelify")
    .bundle()
    .pipe(source('typopo.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('copy typopo-demo to build', function () {
  return gulp
    .src('demo/typopo-demo.html')
    .pipe(gulp.dest(buildPath));
});

gulp.task('server', ['copy typopo-demo to build'], function (done) {
  http.createServer(
    st({path: __dirname + '/build/', index: 'demo/typopo-demo.html', cache: false})
  ).listen(8080, done);
});


gulp.task('watch', ['build-dev', 'build-browser-dev', 'server'], function () {
  livereload.listen();
  gulp.watch(['./src/**/*.js', './src/*.js', './demo/*.html'], ['build-dev', 'build-browser-dev', 'copy typopo-demo to build']);
});

gulp.task('default', ['watch']);
