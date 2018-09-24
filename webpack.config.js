const path = require("path"); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: "./src/js/main.js",
        page: "./src/js/main-page.js",
        component: "./src/js/main-component.js"
    },
    mode: "development",
    output: {
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    resolve: {
        alias: {
            // 'vue$': 'vue/dist/vue.esm.js' // 'vue.common.js' para webpack 1
            'vue$': 'vue/dist/vue.min.js',
            'vue-router$': 'vue-router/dist/vue-router.min.js',
            'codemirror$': 'codemirror/lib/codemirror.js',
            'htmlmixed$': 'codemirror/mode/htmlmixed/htmlmixed.js',
            'css$': 'codemirror/mode/css/css.js',
            'javascript$': 'codemirror/mode/javascript/javascript.js',
        }
    },
    externals: {
        Vue: 'Vue',
        Firebase: "firebase"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    // process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'vue-style-loader',
                    'css-loader',
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: path.resolve(__dirname, 'src')
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
             
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),

        new HtmlWebpackPlugin({
            title: 'LT Editor',
            filename: 'index.html',
            chunks: ['main'],
            template: 'src/html/index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'LT Component',
            filename: 'component.html',
            chunks: ['component'],
            // excludeChunks: ['dev-helper']
            template: 'src/html/component.html'
        }),
        new HtmlWebpackPlugin({
            title: 'LT Page',
            filename: 'page.html',
            chunks: ['page'],
            // excludeChunks: ['dev-helper']
            template: 'src/html/page.html'
        }),
        
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new VueLoaderPlugin(),
        // new MonacoWebpackPlugin(),
        // new webpack.ProvidePlugin({
        //     'Promise': 'bluebird'
        // }),
    ]
};