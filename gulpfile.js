const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const del = require("del");
const git = require("gulp-git");
const babel = require("gulp-babel");
const concat = require("gulp-concat");

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
    .src("src/js/main/**/*.js")
    .pipe(terser())
    .pipe(gulp.dest("dist/js/main"))
    .pipe(browserSync.stream());
}

function wfScripts() {
  return gulp
    .src("src/js/webflow/**/*.js")
    .pipe(terser())
    .pipe(gulp.dest("dist/js/webflow"))
    .pipe(browserSync.stream());
}

function copyHtml() {
  return gulp
    .src("src/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

function autoGitCommit() {
  /*return gulp
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
    });*/
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
  gulp.watch("src/js/main/**/*.js", gulp.series(scripts, delayedGitCommit));
  gulp.watch(
    "src/js/webflow/**/*.js",
    gulp.series(wfScripts, delayedGitCommit)
  );
  gulp.watch("src/*.html", gulp.series(copyHtml, delayedGitCommit));
}

const buildAndServe = gulp.series(
  clean,
  gulp.parallel(styles, scripts, wfScripts, copyHtml),
  watch
);

gulp.task("default", buildAndServe);
