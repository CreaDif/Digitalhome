// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var config = require('./config');
var jade = require('gulp-jade');
var minifyHtml = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
 
// JS hint task
gulp.task('jshint', function() {
  	gulp.src(['./src/scripts/*.js', '!**/jquery.js', '!**/jquery-easing.js'])
    	.pipe(plumber())
    	.pipe(jshint())
    	.pipe(jshint.reporter('default'));
});

// Compress new or changed images
gulp.task('imagemin', function() {
	var imgSrc = './src/images/**/*';
	var imgDst = './images';

	gulp.src(imgSrc)
		.pipe(plumber())
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});

// Produce production scripts
gulp.task('scripts', function() {
	gulp.src(['./src/scripts/index.js', './src/scripts/err.js'])
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest('./scripts'));
});

// Produce production css
gulp.task('sass', function() {
	gulp.src('./src/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer(config.autoprefixer))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./css'));
});

// Produce production HTML
gulp.task('jade', function() {
	gulp.src('./src/*.jade')
		.pipe(plumber())
		.pipe(jade({
		  pretty: true
		}))
		.pipe(gulp.dest('./'));
});

// Minify HTML
gulp.task('minify-html', function() {
	gulp.src('./*.html')
		.pipe(plumber())
		.pipe(minifyHtml())
		.pipe(gulp.dest('./'));
});

// Minify css
gulp.task('minify-css', function() {
	gulp.src('./css/*.css')
		.pipe(plumber())
		.pipe(minifyCSS())
		.pipe(gulp.dest('./css'));
})

// Build task
gulp.task('build', ['sass', 'jade', 'imagemin', 'scripts'], function() {});

// Build production state
gulp.task('productive', ['build', 'minify-css', 'minify-html'], function() {});

// Watch task for automated building
gulp.task('watch', ['build'], function() {
	// watch for jade changes
	gulp.watch(['./src/*.jade', './src/**/*.jade'], function() {
		gulp.run('jade');
	});

	// watch for sass changes
	gulp.watch(['./src/*.scss', './src/**/*.scss'], function() {
		gulp.run('sass');
	});

	// watch for image changes
	gulp.watch('./src/scripts/*.js', function() {
		gulp.run('scripts');
	});

	// watch for image changes
	gulp.watch('./src/images/**/*', function() {
		gulp.run('imagemin');
	});
});