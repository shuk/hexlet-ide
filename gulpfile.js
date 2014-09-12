/* global process require */

// var path = require("path");

var gulp = require("gulp");
// var gutil = require("gulp-util");
// var download = require("gulp-download");
// var cjsx = require("gulp-cjsx");
var webpack = require("gulp-webpack");
var webpackConfig = require("./webpack.config.js");
var nodemon = require("gulp-nodemon");

// var $ = require("gulp-load-plugins")();
gulp.task("default", ["develop"]);

gulp.task("webpack", function() {
    return gulp.src("./src/editor/main.js")
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest("src/backend/public/assets"));
});

gulp.task("develop", function() {
    process.env.NODE_ENV = "develop";
    nodemon({script: "bin/codex.js"});
});
