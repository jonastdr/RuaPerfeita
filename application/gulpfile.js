var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('minifica_app', function () {
	return gulp.src('www/js/app.js')
		.pipe(uglify())
		.pipe(gulp.dest('www/js'));
});

gulp.task('default', ['minifica_app'], function () {
	gulp.watch('www/js/app.js', ['minifica_app']);
});