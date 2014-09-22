/* global require process module __dirname */

var path = require("path");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var morgan = require("morgan");

var s = function(options) {
  app.use(morgan("combined"));

  app.engine("jade", require("jade").__express);

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");

  console.log("info: starting on port '" + options.port + "'");
  server.listen(options.port);

  var io = require("socket.io")(server);
  require("./rpc")(io, options);
  require("./terminal")(io, app, options);

  var routes = require("./routes/index");
  app.use("/", routes);

  if (process.env.NODE_ENV === "develop" || process.env.NODE_ENV === "test") {
    require("express-debug")(app, {
      panels: ["locals", "request", "session", "template", "nav"]
    });

    var webpack = require("webpack");
    var webpackConfig = require("../../webpack.config.js");
    var compiler = webpack(webpackConfig);

    var webpackDevMiddleware = require("webpack-dev-middleware");
    var middleware = webpackDevMiddleware(compiler, webpackConfig.devServer);
    app.use(middleware);
  }
  app.use(express.static(path.join(__dirname, "public")));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get("env") === "development") {
    app.use(function(err, req, res) {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {}
    });
  });

  return server;
};

module.exports = s;
