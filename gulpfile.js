var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'sass'], function(){
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('build', ['clean', 'sass'], function(){

	var buildCss = gulp.src('app/css/**/*.css')
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJS = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHTML = gulp.src('app/**/*.html')
	.pipe(gulp.dest('dist'));

	var buildImg = gulp.src('app/img/*')
	.pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['watch']);