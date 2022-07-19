const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')


let mode = "development"

if(process.env.NODE_ENV === "production") {
  mode = "production";
}

const dirApp = path.join(__dirname, "app")
const dirVideos = path.join(__dirname, "app/images")
const dirImages = path.join(__dirname, "app/images")
const dirStatic = path.join(__dirname, "app/static")
const dirStyles = path.join(__dirname, "app/styles")
const dirNode = "node_modules"

module.exports = {
    mode : mode,
    entry: [
        path.join(dirApp, "index.js"),
        path.join(dirStyles, "index.scss")
    ],
    resolve: {
        modules: [
        dirApp,
        dirVideos,
        dirImages,
        dirStyles,
        dirStatic,
        dirNode
        ],
    },
    devtool: "source-map",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
            }
        },
        {
            test: /\.(png|jpe?g|svg|gif|svg|webp|mp4)$/,
            type: "asset/resource",
            generator: {
            filename: "images/[hash][ext]"
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
            generator: {
            filename: "fonts/[hash][ext]"
            }
        },
        {
            test: /\.(png|jpe?g|svg|gif|svg|webp|mp4)$/,
            type: "asset/resource",
            generator: {
            filename: "images/[hash][ext]"
            }
        },
        {
            test: /\.(glsl|frag|vert)$/,
            type: "asset/source", // replaced raw-loader
            exclude: /node_modules/,
        },
        {
            test: /.s?css$/,
            use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                publicPath: "",
            },
            },
                "css-loader",
                "postcss-loader",
                "sass-loader"
            ],
        }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new CopyPlugin({
        patterns: [
            { from: dirStatic, to: "" }
        ],
        }),
        new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin(),
    ],
    devServer: {
        port: 9090,
        open: true,
        hot: true,
        static: {
        directory: path.join(__dirname, "dist")
        }
    }
};
