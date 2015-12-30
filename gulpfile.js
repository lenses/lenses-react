var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var nano = require('gulp-cssnano');
var inject = require('gulp-inject');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var argv = require('yargs').argv;
var del = require('del');



gulp.task('sass:compile', ['clean'],  function(){
  return gulp.src(['./app/styles/**/*.scss'])
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(gulp.dest('./.tmp'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./app/styles/**/*.scss', ['concat:css']);
});

gulp.task('concat:css', ['sass:compile'], function() {
  return gulp.src('./.tmp/*.css')
  .pipe(gulpif(argv.production, concat('all.css')))
  .pipe(gulpif(argv.production, nano()))
  .pipe(gulpif(argv.production, rename({suffix: '.min'})))
  .pipe(gulp.dest('./public/stylesheets'));

});

gulp.task('inject', ['concat:css'], function() {
  var target = gulp.src('./app/views/index.hbs');

  var source = gulp.src('./public/stylesheets/*.css', {read:false});

  return target.pipe(inject(source))
    .pipe(gulp.dest('./app/views'));

});

gulp.task('clean', function() {
  return del(['./.tmp/*.*', './public/stylesheets/*.*']);
});


gulp.task('bundle', function(){
  // return browserify({
  //   entries: 'app/main.jsx',
  //   debug: true
  // })
  // .transform(reactify)
  // .bundle()
  // .pipe(source('app.js'))
  // .pipe(gulp.dest('./.tmp'));
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

gulp.task('serve', ['bundle', 'inject', 'sass:watch', 'nodemon'], function(){
  browserSync.init(null, {
    proxy: "http://localhost:7777",
    files: ["app/**/*.*", "server/**/*.*"],
    port: 9001
  });


});

