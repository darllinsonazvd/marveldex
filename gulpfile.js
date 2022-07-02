const gulp = require('gulp');
const sequence = require('run-sequence');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const webserver = require('gulp-webserver');
var exec = require('child_process').exec;

gulp.task('dev', () => {
  sequence('deps', 'env-dev', 'app', 'server');
});

gulp.task('env-dev', () => {
  return exec('git describe --tags --abbrev=0', (error, stdout) => {
    gulp.src('environment/env.dev.js').pipe(concat('env.js')).pipe(gulp.dest('app/env/'));
  });
});

gulp.task('app', ['app.html', 'app.css', 'app.js', 'app.assets']);

gulp.task('app.html', () => {
  return gulp
    .src('app/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('app.css', () => {
  return gulp
    .src(['app/**/*.css', 'assets/css/**/*.css'])
    .pipe(uglifycss({ uglyComments: true }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('app.js', () => {
  return (
    gulp
      .src([
        'app/app.module.js',
        'app/env/**/*.js',
        'app/config/**/*.js',
        'app/public/**/*.js',
        'app/shared/**/*.js'
      ])
      .pipe(babel({ presets: ['env'] }))
      // .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('dist/assets/js'))
  );
});

gulp.task('app.assets', () => {
  return gulp.src('assets/**/*.*').pipe(gulp.dest('dist/assets'));
});

gulp.task('deps', ['deps.js', 'deps.css']);

gulp.task('deps.js', () => {
  return gulp
    .src([
      'node_modules/angular/angular.min.js',
      'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(concat('deps.min.js'))
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('deps.css', () => {
  return gulp
    .src(['node_modules/bootstrap/dist/css/bootstrap.min.css'])
    .pipe(uglifycss({ uglyComments: true }))
    .pipe(concat('deps.min.css'))
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('watch', () => {
  watch('app/**/*.html', () => gulp.start('app.html'));
  watch('app/**/*.css', () => gulp.start('app.css'));
  watch('assets/css/**/*.css', () => gulp.start('app.css'));
  watch('app/**/*.js', () => gulp.start('app.js'));
  watch('app/**/*.*', () => gulp.start('app.assets'));
});

gulp.task('server', ['watch'], () => {
  return gulp.src('dist').pipe(
    webserver({
      host: 'localhost',
      livereload: true,
      port: 4200,
      open: false
    })
  );
});

gulp.task('prod', () => {
  sequence('deps', 'env-dev', 'app');
});
