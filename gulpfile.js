var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglifyCSS = require('gulp-uglifycss');
var rename = require('gulp-rename');

var AUTOPREFIX = {
	cascade: false,
	browsers: [
					"ff >= 16",
					"Chrome >= 20",
					"ie >= 8",
					"Opera >= 15",
					"Safari >= 3.1",
					"ie_mob >= 10",
					"ios_saf >= 3.2",
					"bb >= 7"
				]
};

gulp.task('scripts', function () {
  gulp.src(['app/**/app.module.js', 'app/**/*.js'])
  	// .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    // .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('assets/dist/scripts'));
});

gulp.task('styles', function () {
	gulp.src('assets/src/styles/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIX))
		.pipe(uglifyCSS())
		.pipe(rename({dirname: '', extname: ".min.css"}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('assets/dist/styles'));
});

gulp.task('watch', ['scripts', 'styles'], function () {
	gulp.watch('app/**/*.js', ['scripts']);
	gulp.watch('assets/src/styles/**/*.scss', ['styles']);
});

gulp.task('default', ['watch']);