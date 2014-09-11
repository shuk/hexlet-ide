/* global require */

var path = require("path");

var gulp = require("gulp");
var gutil = require("gulp-util");
var download = require("gulp-download");
// var cjsx = require("gulp-cjsx");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

// var $ = require("gulp-load-plugins")();
gulp.task("default", ["dev-server"]);

// gulp.task("webpack", function() {
//   return gulp.src("src/scripts/main.js")
//   .pipe(webpack(webpackConfig))
//   .pipe(gulp.dest("dist/"));
// });

gulp.task("dev-server", function() {
    var compiler = webpack(webpackConfig);
    var server = require("./src/backend/server")(compiler, webpackConfig.devServer);
});

gulp.task("download-vendor", function() {
    download("http://jnuno.com/tree-model-js/vendor/jnuno/TreeModel.js")
    .pipe(gulp.dest("src/editor/vendor"));
});
