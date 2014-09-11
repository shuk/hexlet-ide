/* global module require __dirname */

var path = require("path");
var webpack = require("webpack");

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

    cache: true,
    debug: true,
    devtool: "source-map",
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
        }],

        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ]

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
