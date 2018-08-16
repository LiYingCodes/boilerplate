const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
// const kit = require("node-kit");
const kit = require("gulp-kit");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

gulp.task("styles", () => {
    return gulp
        .src("./dev/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(
            autoprefixer(
                "last 2 version",
                "safari 5",
                "ie 8",
                "ie 9",
                "opera 12.1"
            )
        )
        .pipe(concat("style.css"))
        .pipe(gulp.dest("./public/styles"))
        .pipe(reload({ stream: true }));
});

gulp.task("watch", function() {
    gulp.watch("./dev/**/*.js", ["scripts"]);
    gulp.watch("./dev/**/*.scss", ["styles"]);
    gulp.watch("./public/*.html", reload);
});

gulp.task("html", () => {
    return gulp
        .src("./dev/index.kit")
        .pipe(kit())
        .pipe(gulp.dest("./public"));
});

gulp.task("scripts", () => {
    return gulp
      .src("./dev/**/*.js")
      .pipe(concat("main.js"))
      .pipe(babel({ presets: ["env"] }))
      .pipe(gulp.dest("./public/scripts"))
});

gulp.task("browser-sync", () => {
    browserSync.init({
        server: "./public"
    });
});

gulp.task("default", ["browser-sync", "styles", "scripts"], () => {
    gulp.watch("dev/**/*.js", ["scripts"]);
    gulp.watch("dev/**/*.scss", ["styles"]);
    gulp.watch("./public/styles/style.css", reload);
    gulp.watch("./public/*.html", reload);
});
