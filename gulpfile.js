/* global process require */

var gulp = require("gulp");
var webpack = require("gulp-webpack");
var nodemon = require("gulp-nodemon");

var webpackConfig = require("./webpack.config.js");
var nodemonConfig = require("./nodemon.json");

// var $ = require("gulp-load-plugins")();
gulp.task("default", ["develop"]);

gulp.task("webpack", function() {
  return gulp.src("./src/editor/main.js")
  .pipe(webpack(webpackConfig()))
  .pipe(gulp.dest("src/backend/public/assets"));
});

gulp.task("prepublish", function() {
  process.env.NODE_ENV = "prepublish";
  return gulp.src("./src/editor/main.js")
  .pipe(webpack(webpackConfig()))
  .pipe(gulp.dest("src/backend/public/assets"));
});

gulp.task("develop", function() {
  process.env.NODE_ENV = "develop";
  process.env.PORT = 9000;
  process.env.TEST_DIR = "test/fixtures/project";
  nodemon(nodemonConfig);
});
