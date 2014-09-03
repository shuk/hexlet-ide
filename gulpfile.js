/* global require */

var path = require("path");

var gulp = require("gulp");
var gutil = require("gulp-util");
// var cjsx = require("gulp-cjsx");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

var port = 5000;
var cssVendorPaths = [
    "bootstrap/dist/css/bootstrap.css",
    "bootstrap/dist/css/bootstrap.css.map",
    "fuelux/dist/css/fuelux.css",
    "fuelux/dist/css/fuelux.css.map"
];

var fontsVendorPaths = [
    "bootstrap/dist/fonts/*.*",
    "fuelux/dist/fonts/*.*"
];

var jsVendorPaths = [
    "jquery/dist/jquery.js",
    "react/JSXTransformer.js",
    "react/react-with-addons.js"
];

// var $ = require("gulp-load-plugins")();
gulp.task("default", ["dev-server"]);

gulp.task("dev-copy-assets", function(){
    var cssPaths = cssVendorPaths.map(function(p) {
        return path.resolve("bower_components", p);
    });
    gulp.src(cssPaths).pipe(gulp.dest("./dev/css"));

    var jsPaths = jsVendorPaths.map(function(p) {
        return path.resolve("bower_components", p);
    });
    gulp.src(jsPaths).pipe(gulp.dest("./dev/js"));

    var fontsPaths = fontsVendorPaths.map(function(p) {
        return path.resolve("bower_components", p);
    });
    gulp.src(fontsPaths).pipe(gulp.dest("./dev/fonts"));
});

// gulp.task("cjsx", function() {
//   gulp.src("./src/*.cjsx")
//   .pipe(cjsx({bare: true}).on("error", gutil.log))
//   .pipe(gulp.dest("./public/"));
// });

// gulp.task("webpack", function() {
//   return gulp.src("src/scripts/main.js")
//   .pipe(webpack(webpackConfig))
//   .pipe(gulp.dest("dist/"));
// });

gulp.task("dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, webpackConfig.devServer).listen(port, "localhost", function(err) {
        if (err) { throw new gutil.PluginError("webpack-dev-server", err); }
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:" + port + "/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});
