/* global module require __dirname */

var path = require("path");

module.exports = {
    output: {
        publicPath: "/assets/",
        path: path.join(__dirname, "dist"),
        filename: "main.js"
    },

    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery",
        // "lodash": "_",
        "React": "React"
    },

    cache: true,
    debug: true,
    devtool: "source-map",
    entry: ["./src/scripts/main.js"],

    // stats: {
    //   colors: true,
    //   reasons: true
    // },

    devServer: {
        publicPath: "/assets/",
        contentBase: "./dev"
    },

    resolve: {
        modulesDirectories: [
            "src", "src/scripts", "node_modules", "bower_components"
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
        // , {
        //     test: /\.gif/,
        //     loader: 'url-loader?limit=10000&mimetype=image/gif'
        //   }, {
        //     test: /\.jpg/,
        //     loader: 'url-loader?limit=10000&mimetype=image/jpg'
        //   }, {
        //     test: /\.png/,
        //     loader: 'url-loader?limit=10000&mimetype=image/png'
        //   }, {
        //     test: /\.jsx$/,
        //     loader: 'jsx-loader'
        //   }]
    }
};
