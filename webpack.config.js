// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const stylesHandler = "style-loader";

let htmlPageNames = ['index', 'stories', 'page1'];

let multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
        template: `./src/${name}.html`, // relative path to the HTML files
        filename: `${name}.html`, // output HTML files
        chunks: [`${name}`] // respective JS files
    })
});

const config = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        open: true,
        host: "localhost",
    },

    plugins: [].concat(
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [{ from: "./src/assets", to: "assets" }],
            options: {
                concurrency: 100,
            },
        }),
        htmlPageNames.map(
            (page) =>
                new HtmlWebpackPlugin({
                    template: `./src/${page}.html`, // relative path to the HTML files
                    filename: `${page}.html`, // output HTML files
                    chunks: [`${page}`] // respective JS files
                })
        ),
        // <- here goes array(s) of other plugins
    ),


/*    plugins: [
        new HtmlWebpackPlugin({
           template: "./src/index.html",
            scriptLoading: "blocking",
            inject: "head",
        }),


        new MiniCssExtractPlugin(),


    ].concat(multipleHtmlPlugins),
    */

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader", "postcss-loader"],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};