var gulp = require('gulp');
var react = require('gulp-react');
var less = require('gulp-less');
var clean = require('gulp-clean');
var concat = require('gulp-concat');

gulp.task('copy-js-vendor', function() {
  return gulp.src([
      'node_modules/react/dist/react.js',
      'node_modules/react-dom/dist/react-dom.js',
      'src/js/vendor/*.js'])
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('vendor', ['copy-js-vendor']);

gulp.task('clean', function(){
  return gulp.src('dist/')
    .pipe(clean())
});

gulp.task('jsx', function(){
  return gulp.src('src/jsx/*.jsx')
    .pipe(react())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('less', function () {
  return gulp.src([
      'src/less/*.less',
      'node_modules/highlight.js/styles/xcode.css',
      'node_modules/highlight.js/styles/monokai-sublime.css'])
    .pipe(less())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('html', function(){
  return gulp.src('src/html/*.html')
    .pipe(gulp.dest('dist/'))
});

gulp.task('default', ['vendor','jsx','less','html']);
