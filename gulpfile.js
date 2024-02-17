const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const del = require('del');
const git = require('gulp-git');

function clean() {
  return del(['dist/*']);
}

function styles() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src('src/js/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

function autoGitCommit() {
  return gulp.src('./')
    .pipe(git.add({ args: '-A' }))
    .pipe(git.commit('Automatisk commit: sparade ändringar'))
    .on('end', function() {
      git.push('origin', 'main', function(err) {
        if (err) throw err;
      });
    });
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('src/sass/**/*.scss', gulp.series(styles, autoGitCommit));
  gulp.watch('src/js/**/*.js', gulp.series(scripts, autoGitCommit));
  gulp.watch('dist/**/*').on('change', browserSync.reload);
}

const buildAndServe = gulp.series(clean, gulp.parallel(styles, scripts), watch);

gulp.task('default', buildAndServe);
