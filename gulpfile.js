// Require node modules
var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  rename = require("gulp-rename"),
  terser = require("gulp-terser"),
  babel = require("gulp-babel"),
  cleanCSS = require("gulp-clean-css"),
  cssbeautify = require("gulp-cssbeautify"),
  autoprefixer = require("autoprefixer"),
  del = require("del");

paths = {
  sass: "./src/sass/",
  css: "./build/css/",
  scripts: "./src/scripts/",
  js: "./build/js/",
  site: "./build/"
};

// Build CSS
gulp.task("sass", ["clean:css"], function() {
  return gulp
    .src(paths.sass + "*.scss")
    .pipe(sass(autoprefixer()))
    .pipe(cssbeautify({ autosemicolon: true }))
    .pipe(gulp.dest(paths.css))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.css));
});

// Browser sync task: to launch a server and auto-reload
gulp.task("browser-sync", ["sass", "scripts"], function() {
  browserSync({
    server: {
      baseDir: paths.site
    }
  });
});

// Scripts task: Compile TypeScript files to js
gulp.task("scripts", ["clean:js"], function() {
  return gulp
    .src(paths.scripts + "*.js")
    .pipe(babel())
    .pipe(gulp.dest(paths.js))
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.js));
});

// CLEAN files
gulp.task("clean:js", function() {
  return del([paths.js]);
});

gulp.task("clean:css", function() {
  return del([paths.css]);
});

// Reload browser
gulp.task("reload", function() {
  browserSync.reload();
});

// Watch task: watch for file changes and
// trigger appropriate task.
gulp.task("watch", function() {
  gulp.watch(paths.sass + "**/*.scss", ["sass"]); // Watch sass files
  gulp.watch(paths.scripts + "**/*.js", ["scripts"]);
  gulp.watch(paths.site + "**/*.html", ["reload"]); // Watch html files
});

// Default task: Run `gulp` to launch browser-sync
//and watch for file changes.
gulp.task("default", ["browser-sync", "watch"]);
