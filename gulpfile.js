const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
		uglify = require('gulp-uglify-es').default,
		rename = require('gulp-rename'),
		concat = require('gulp-concat'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS = require('gulp-clean-css'),
		imagemin = require('gulp-imagemin'),
		pug = require('gulp-pug');


gulp.task('js', function() {
	return gulp.src([
		'app/libs/**/*.js',
		// 'app/libs/owlCarousel/owl.carousel.min.js',
		'app/js/main.js']) 
		.pipe(uglify())
		.pipe(concat('common.min.js'))
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.stream());
});

gulp.task('pug', function() {
  return gulp.src('app/pug/**/*.pug')
  .pipe(pug({
    pretty: true
	}))
	.pipe(gulp.dest('app/html'))
	.pipe(browserSync.stream())
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(rename("main.min.css"))
		.pipe(cleanCSS())
		.pipe(autoprefixer({
			browsers: ['last 15 versions'], 
		}))
  	.pipe(gulp.dest('app/css'))
  	.pipe(browserSync.stream())
});

gulp.task('serve', function() {
  browserSync.init({ 
    server: 'app/html'
    }); 
});

gulp.task('watch',['serve', 'sass', 'pug', 'js'], function() {
  gulp.watch('app/sass/**/*.sass', ["sass"])
  	.on('change', browserSync.reload);
  gulp.watch("app/*.pug", ["pug"])
		.on('change', browserSync.reload);
	gulp.watch('app/js/*.js', ["js"])
		.on('change', browserSync.reload);
});

gulp.task('default', ['watch']);


gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
});

gulp.task('build', ['imagemin', 'sass', 'pug', 'js'], function() {
	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
	
	var buildCss = gulp.src('app/css/main.min.css')
		.pipe(gulp.dest('dist/css'));

	var buildHtml = gulp.src('app/html/**/*html')
		.pipe(gulp.dest('dist'))

	var buildJs = gulp.src('app/js/common.min.js')
		.pipe(gulp.dest('dist/js'));
	
	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
});