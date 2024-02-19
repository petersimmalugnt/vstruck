const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();
const del = require("del");
const git = require("gulp-git");
const babel = require("gulp-babel");

function clean() {
  return del(["dist/*"]);
}

function styles() {
  return gulp
    .src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("dist/css"))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src("src/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-transform-modules-commonjs"],
      })
    )
    .pipe(terser())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
}

function copyHtml() {
  return gulp
    .src("src/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

function autoGitCommit() {
  return gulp
    .src("./")
    .pipe(git.add({ args: "-A" }))
    .pipe(git.commit("Automatisk commit: sparade ändringar"))
    .on("end", function () {
      git.push("origin", "main", function (err) {
        if (err) {
          console.error("Error pushing to Git:", err);
          throw err;
        } else {
          console.log("Successfully pushed to Git.");
        }
      });
    });
}

const { promisify } = require("util");
const setTimeoutPromise = promisify(setTimeout);

function delayedGitCommit() {
  return setTimeoutPromise(500).then(() => autoGitCommit());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch("src/sass/**/*.scss", gulp.series(styles, delayedGitCommit));
  gulp.watch("src/js/**/*.js", gulp.series(scripts, delayedGitCommit));
  gulp.watch("src/*.html", gulp.series(copyHtml, delayedGitCommit));
}

const buildAndServe = gulp.series(
  clean,
  gulp.parallel(styles, scripts, copyHtml),
  watch
);

gulp.task("default", buildAndServe);
