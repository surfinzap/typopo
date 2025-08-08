const gulp = require('gulp');
const browsersync = require("browser-sync").create();
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const replace = require('gulp-replace');
const header = require('gulp-header');
const packageJson = require('./package.json');
const { transform } = require('@swc/core');
const through = require('through2');

const currentYear = new Date().getFullYear();

var paths = {
	dev: {
		html: 'demo/typopo-demo.html',
		index: 'typopo-demo.html',
		name: 'typopo_browser.built.js',
		dest: 'build/'
	},
	browser: {
		src: 'src/browser_typopo.js',
		name: 'typopo.min.js',
		dest: 'dist/'
	},
	npm: {
		src: 'src/typopo.js',
		name: 'typopo_dist.min.js',
		dest: 'dist/'
	},
	root: {
		src: 'src/typopo.js',
		dest: 'src/'
	}
};

// Copyright banner for the minified files
const copyrightBanner = `/*!
 * Typopo v${packageJson.version} (https://typopo.org)
 * Copyright 2015–${currentYear} Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
`;

function swcMinify() {
  return through.obj(async function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(new Error('Streaming not supported'));
    }

    try {
      const result = await transform(file.contents.toString(), {
        jsc: {
          parser: {
            syntax: 'ecmascript',
            jsx: false
          },
          target: 'es2015',
          minify: {
            compress: {
              arguments: true,
              arrows: true, 
              booleans: true,
              collapse_vars: true,
              comparisons: true,
              computed_props: true,
              conditionals: true,
              dead_code: true,
              drop_console: false,
              drop_debugger: true,
              evaluate: true,
              hoist_funs: false,
              hoist_props: true,
              hoist_vars: false,
              if_return: true,
              join_vars: true,
              keep_classnames: false,
              keep_fargs: true,
              keep_fnames: false,
              keep_infinity: false,
              loops: true,
              negate_iife: true,
              properties: true,
              reduce_funcs: false,
              reduce_vars: false,
              sequences: true,
              side_effects: true,
              switches: true,
              typeofs: true,
              unsafe: false,
              unsafe_arrows: false,
              unsafe_comps: false,
              unsafe_Function: false,
              unsafe_math: false,
              unsafe_methods: false,
              unsafe_proto: false,
              unsafe_regexp: false,
              unsafe_undefined: false,
              unused: true
            },
            mangle: {
              toplevel: true
            }
          }
        },
        minify: true
      });

      file.contents = Buffer.from(result.code);
      callback(null, file);
    } catch (error) {
      callback(new Error(`SWC minification failed: ${error.message}`));
    }
  });
}

// Update version in typopo.js
function updateTypopoJsCopyrightBanner() {

  const bannerRegex = /\/\*\![\s\S]*?\*\/\s*/;

  return gulp.src(paths.root.src)
    .pipe(replace(bannerRegex, '')) 
    .pipe(header(copyrightBanner))  
    .pipe(gulp.dest(paths.root.dest)); 
}

function devBrowserBuild() {
	return browserify({entries: paths.browser.src, debug: true})
		.transform("babelify")
		.bundle()
		.pipe(source(paths.dev.name))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(paths.dev.dest))
}

function browserBuild() {
	return browserify({ entries: paths.browser.src, debug: false })
		.transform(babelify)
		.bundle()
		.pipe(source(paths.browser.name))
		.pipe(buffer())
		.pipe(swcMinify())
		.pipe(header(copyrightBanner)) // Add the header
		.pipe(gulp.dest(paths.browser.dest));
}

function npmBuild() {
	return browserify({entries: paths.npm.src}, {standalone: 'typopo'})
		.transform("babelify")
		.bundle()
		.pipe(source(paths.npm.name))
		.pipe(buffer())
		.pipe(swcMinify())
		.pipe(header(copyrightBanner)) // Add the header
		.pipe(gulp.dest(paths.npm.dest));
}

function copyHtmlToDest() {
	return gulp
		.src(paths.dev.html)
		.pipe(gulp.dest(paths.dev.dest));
}

function watchFiles() {
	gulp.watch(
		[
			paths.npm.src,
			paths.browser.src,
			paths.dev.html,
			"./src/**/*",
		],
			gulp.series(devBrowserBuild, copyHtmlToDest, browserSyncReload)
		);
}

// BrowserSync
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: 'build/',
			index: 'typopo-demo.html'
		},
		port: 3000
	});
	done();
}

// BrowserSync Reload
function browserSyncReload(done) {
	browsersync.reload();
	done();
}

const watch = gulp.parallel(watchFiles, browserSync);
const build = gulp.parallel(npmBuild, browserBuild, copyHtmlToDest);

exports.watch = watch;
exports.build = build;
exports.updateTypopoJsCopyrightBanner = updateTypopoJsCopyrightBanner;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
