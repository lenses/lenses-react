var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');
var inject = require('gulp-inject');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var argv = require('yargs').argv;
var del = require('del');
var requireGlobify = require('require-globify');
var watchify = require('watchify');
var glob = require('glob');
var path = require('path');

// TODO: Use these
var paths = {
  SCSS: ['./app/styles/**/*.scss'],
  HBS: ['./app/views/**/*.hbs'],
  VIEWS_DIR: ['./app/views'],
  TMP_DIR: './.tmp',
  BUILD_BASE_DIR: './public',
  BUILD_CSS_DIR: './public/stylesheets'
};

gulp.task('clean', function() {
  return del(['./public/stylesheets/*.*']);
});

gulp.task('sass:compile', ['clean'],  function(){
  return gulp.src(['./app/styles/**/*.scss'])
  .pipe(sass.sync().on('error', function(err){
    sass.logError(err);
  }))
  .pipe(gulpif(argv.production, nano()))
  .pipe(gulpif(argv.production, rename({suffix: '.min'})))
  .pipe(gulp.dest('./public/stylesheets'))
  .pipe(browserSync.stream());

});

gulp.task('sass:watch', function () {
  gulp.watch('./app/styles/**/*.scss', ['sass:compile']);
});

gulp.task('inject:assets', ['sass:compile'], function() {
  var target = gulp.src(['./app/views/*.hbs']);
  var source = gulp.src(['./public/stylesheets/*.css', './public/js/ui.js'], {read:false});
  return target.pipe(inject(source))
  .pipe(gulp.dest('./app/views/'));
});

function runWatchify(file, output, standaloneLib) {

  output += '.js';
  var b =  browserify({
    debug: !process.env.production,
    extensions: ['.jsx'],
    cache: {},
    packageCache: {},
    fullPaths: true,
    standalone: standaloneLib
  });
  b.add(file);
  b = watchify(b)
  b.on('update', function(){
    browserifyBundle(b, output).on('end', function(){
      browserSync.reload({ stream: false });
    });
  });
  b.on('log', function(msg){
    console.log(msg);
  })
  browserifyBundle(b, output);

}

function browserifyBundle(b, output) {
  return b.transform(reactify)
  .transform(requireGlobify)
  .bundle()
  .on('error', function(e){
    console.log(e.message);
    this.emit('end');
  })
  .pipe(source(output))
  .pipe(gulp.dest('./public/js'));
}


gulp.task('bundle', function(){
  var files = glob.sync('./app/components/custom/*.jsx');
  runWatchify('app/main.jsx', 'ui', 'LensUI');
  files.forEach(function(file) {
    return runWatchify(file, path.basename(file, '.jsx'), path.basename(file, '.jsx'));
  })
});

gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'server/main.js',
    options: {
      watchedExtensions: ['js']
    },
    ignore: ['app/**', 'public/**', './*.js']
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  }) .on('restart', function () {
    setTimeout(function() {
      browserSync.reload({ stream: false });
    }, 1000);
  });
});

gulp.task('build', ['inject:assets']);

gulp.task('serve', ['bundle', 'inject:assets', 'sass:watch', 'nodemon'], function(){
  browserSync.init(null, {
    proxy: "http://localhost:7777",
    files: ['public/images'],
    port: 9001
  });
});

