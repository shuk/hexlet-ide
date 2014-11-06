/* global module require __dirname process */

var path = require("path");

function isPrepublish() {
  "use strict";
  return process.env.NODE_ENV === "prepublish";
};


module.exports = function() {
  return {
    output: {
      publicPath: "/assets/",
      path: path.join(__dirname, "dist"),
      filename: "main.js"
    },

    cache: isPrepublish() ? false : true,
    debug: isPrepublish() ? false : true,
    devtool: isPrepublish() ? false : "source-map",
    target: "web",
    entry: ["./src/editor/main.js"],

    externals: {
      "react/addons": "React"
    },

    // stats: {
    //   colors: true,
    //   reasons: true
    // },

    devServer: {
      publicPath: "/assets/"
      // contentBase: "./dev"
    },

    resolve: {
      modulesDirectories: [
        "src", "node_modules", "bower_components"
      ]
    },

    module: {
      loaders: [{
        test: /\.css$/,
        loader: "style!css"
      }, {
        test: /\.js$/,
        loader: "jsx-loader?harmony"
      }, {
        test: /\.less$/,
        loader: "style!css!less"
      }, {
        test: /\.(png|svg|woff|eot|ttf|otf)$/,
        loader: "url?limit=100000"
      }]
    }
  };
};
