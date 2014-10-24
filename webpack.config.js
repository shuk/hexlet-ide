/* global module require __dirname process */

var path = require("path");

function isPublish() {
  "use strict";
  return process.env.NODE_ENV === "publish";
}

module.exports = {
  output: {
    publicPath: "/assets/",
    path: path.join(__dirname, "dist"),
    filename: "main.js"
  },

  // externals: {
  //     // require("jquery") is external and available
  //     //  on the global var jQuery
  //     "jquery": "jQuery",
  //     // "lodash": "_",
  //     "react": "React"
  // },

  cache: isPublish() ? false : true,
  debug: isPublish() ? false : true,
  devtool: isPublish() ? false : "source-map",
  target: "web",
  entry: ["./src/editor/main.js"],

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
    //   preLoaders: [{
    //     test: '\\.js$',
    //     exclude: 'node_modules',
    //     loader: 'jshint'
    //   }],

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
