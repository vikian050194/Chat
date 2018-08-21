var webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ["./client/js/index.js", "./client/js/index.css.js"],
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["babel-preset-env"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    output: {
        filename: "./build/bundle.js",
        path: __dirname + "/client"
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "Backbone": "backbone"
        }),
        new ExtractTextPlugin("./build/bundle.css")
    ]
};