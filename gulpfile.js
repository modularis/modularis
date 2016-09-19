const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const buble = require('rollup-plugin-buble');
const buffer = require('vinyl-buffer');
const cleancss = require('gulp-cleancss');
const commonjs = require('rollup-plugin-commonjs');
const eslint = require('gulp-eslint');
const glob = require('glob');
const gulp = require('gulp');
const htmllint = require('gulp-htmllint');
const merge = require('merge-stream');
const nodeResolve = require('rollup-plugin-node-resolve');
const nodeSassMagicImporter = require('node-sass-magic-importer');
const nodemon = require('gulp-nodemon');
const path = require('path');
const rename = require('gulp-rename');
const rollup = require('rollup-stream');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('gulp-stylelint');
const uglify = require('gulp-uglify');

/**
 * Serve
 */
gulp.task('browser-sync', ['serve'], () =>
  browserSync.init({
    proxy: 'localhost:2999',
    files: 'app/public'
  })
);

gulp.task('serve', () =>
  nodemon({ script: 'app/app.js', watch: 'app/lib' })
);

/**
 * Styles
 */
gulp.task('styles:build', () =>
  gulp.src('resources/scss/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({
        importer: nodeSassMagicImporter
      }).on('error', sass.logError))
      .pipe(autoprefixer())
    .pipe(sourcemaps.write({ sourceRoot: '/resources/scss' }))
    .pipe(gulp.dest('app/public/css'))
    .pipe(rename((originalPath) => {
      originalPath.basename += '.min';
    }))
    .pipe(cleancss())
    .pipe(gulp.dest('app/public/css'))
);

gulp.task('styles:lint', () =>
  gulp.src('resources/scss/**/*.scss')
    .pipe(stylelint({
      syntax: 'scss',
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
);

gulp.task('styles', [
  'styles:build',
  'styles:lint'
]);

/**
 * Scripts
 */
const rollupConfig = {
  format: 'iife',
  sourceMap: true,
  plugins: [
    buble(),
    nodeResolve({
      jsnext: true,
      browser: true
    }),
    commonjs()
  ]
};

gulp.task('scripts:build:global', () =>
  rollup(Object.assign(rollupConfig, {
    entry: 'resources/js/app/global.js'
  }))
  .pipe(source('global.js', 'resources/js/app'))
  .pipe(gulp.dest('app/public/js'))
  .pipe(rename((originalPath) => {
    originalPath.basename += '.min';
  }))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('app/public/js'))
);

gulp.task('scripts:build:controller', () =>
  merge(glob.sync('resources/js/controller/**/*.js').map((entry) =>
    rollup(Object.assign(rollupConfig, {
      entry
    }))
    .pipe(source(path.resolve(entry), path.resolve('resources/js/controller')))
  ))
  .pipe(gulp.dest('app/public/js'))
  .pipe(rename((originalPath) => {
    originalPath.basename += '.min';
  }))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('app/public/js'))
);

gulp.task('scripts:build:service-worker', () =>
  rollup(Object.assign(rollupConfig, {
    entry: 'resources/js/app/service-worker.js'
  }))
  .pipe(source('service-worker.js', 'resources/js/app'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('app/public'))
);

gulp.task('scripts:build', [
  'scripts:build:global',
  'scripts:build:controller',
  'scripts:build:service-worker'
]);

gulp.task('scripts:lint', () =>
  gulp.src('resources/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('scripts', [
  'scripts:build',
  'scripts:lint'
]);

/**
 * HTML
 */
gulp.task('html:lint', () =>
  gulp.src('resources/**/*.hbs')
    .pipe(htmllint())
);

gulp.task('html', [
  'scripts:lint'
]);

/**
 * Watch
 */
gulp.task('default', ['browser-sync'], () => {
  gulp.watch('resources/scss/**/*.scss', ['styles:build']);
  gulp.watch('resources/js/**/*.js', ['scripts:build']);
});
