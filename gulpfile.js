var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('jsx', function(){
  return gulp.src('src/jsx/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('html', function(){
  return gulp.src('src/html/*.html')
    .pipe(gulp.dest('dist/html'))
});

gulp.task('default', ['jsx','html']);
