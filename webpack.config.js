var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var OpenBrowserPlugin = require("open-browser-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src/app.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle-[hash].js"
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                loader: "babel-loader",
                exclude: path.resolve(__dirname, "node_modules"),
                include: path.resolve(__dirname, "src"),
                query:{
                    presets: ["latest", "react"]
                }
            },{
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
        }),
        new OpenBrowserPlugin({
            url: "http://localhost:8080/"
        })
    ]
};