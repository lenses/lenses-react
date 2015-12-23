var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');




gulp.task('sass', function(){
  gulp.src(['./app/styles/**/*.scss'])
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./app/styles/**/*.scss', ['sass']);
});

gulp.task('bundle', ['sass'], function(){
  return browserify({
    entries: 'app/main.jsx',
    debug: true
  })
  .transform(reactify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./.tmp'));
});

gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
      script: 'server/main.js'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('serve', ['bundle', 'nodemon'], function(){
  browserSync.init(null, {
    proxy: "http://localhost:7777",
    files: ["app/**/*.*", "server/**/*.*"],
    port: 9001
  });


});

