import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemap: app.isDev })
    .pipe(
      app.plagins.plumber(
        app.plagins.notify.onError({
          title: "SASS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plagins.replace(/@img\//g, "../img/"))
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(app.plagins.if(app.isBuild, groupCssMediaQueries()))
    .pipe(
      app.plagins.if(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions", "Safari >=10"],
          cascade: true,
        })
      )
    )
    .pipe(
      app.plagins.if(
        app.isBuild,
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plagins.if(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plagins.browsersync.stream());
};
