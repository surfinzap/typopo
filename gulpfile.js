const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

var paths = {
	browser: {
		src: 'src/browser_typopo.js',
		name: 'typopo.min.js',
		dest: 'dist/'
	},
	npm: {
		src: 'src/typopo.js',
		name: 'typopo_dist.min.js',
		dest: 'dist/'
	}
};

/*
 * Define our tasks using plain functions
 */

function browserBuild() {
	return browserify({ entries: paths.browser.src, debug: false })
		.transform(babelify)
		.bundle()
		.pipe(source(paths.browser.name))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(paths.browser.dest));
}

function npmBuild() {
	return gulp.src(paths.npm.src, { sourcemaps: false })
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat(paths.npm.name))
		.pipe(gulp.dest(paths.npm.dest));
}

function watch() {
	gulp.watch(paths.npm.src, npmBuild);
	gulp.watch(paths.browser.src, browserBuild);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.parallel(npmBuild, browserBuild);

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */

exports.scripts = npmBuild;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
