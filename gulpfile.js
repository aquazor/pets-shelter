const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');

function scriptsMain() {
  return src(['app/js/modules/*.js', 'app/js/main/*.js'])
    .pipe(concat('main.min.js'))
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}
// .pipe(uglify())
function scriptsPets() {
  return src(['app/js/modules/*.js', 'app/js/pets/*.js'])
    .pipe(concat('pets.min.js'))
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function stylesMain() {
  return src(['app/scss/main/main.scss'])
    .pipe(autoprefixer({ overrideBrowsersList: ['last 10 version'] }))
    .pipe(concat('main.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function stylesPets() {
  return src(['app/scss/pets/pets.scss'])
    .pipe(autoprefixer({ overrideBrowsersList: ['last 10 version'] }))
    .pipe(concat('pets.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function watching() {
  watch(['app/scss/**/**/*.scss', 'app/scss/**/*.scss'], series(stylesMain, stylesPets));
  watch(
    ['app/js/main/*.js', 'app/js/pets/*.js', 'app/js/modules/*.js'],
    series(scriptsMain, scriptsPets)
  );
  watch(['app/**/*.html']).on('change', browserSync.reload);
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });
}

function building() {
  return src(['app/css/*.min.css', 'app/js/**/*.min.js', 'app/**/*.html'], {
    base: 'app',
  }).pipe(dest('dist'));
}

function cleaning() {
  return src('dist').pipe(clean());
}

exports.stylesMain = stylesMain;
exports.stylesPets = stylesPets;
exports.scriptsMain = scriptsMain;
exports.scriptsPets = scriptsPets;

exports.watching = watching;
exports.browsersync = browsersync;
exports.build = series(cleaning, building);

exports.default = parallel(stylesMain, stylesPets, scriptsMain, scriptsPets, browsersync, watching);
